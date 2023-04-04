---
title: 'Macros Frontier'
excerpt: 'Procedural Macros の設計について二言三言'
coverImage: '/assets/blog/01GX0ZVZVZPBNZQKWD8KFBAZH5/cover.svg'
date: '2023-04-02 12:42:57.791510309 UTC'
author:
  name: Mitama
  picture: '/assets/blog/authors/mitama.jpg'
ogImage:
  url: '/assets/blog/01GX0ZVZVZPBNZQKWD8KFBAZH5/cover.svg'
---

## 時は西暦2059年。

かつて、procedural macros と呼ばれる巨人たちとの戦争があった。
初めてのメタプログラミングとの戦いで滅びの危機を経験したいなむのみたまのかみは proc macro ライブラリの設計に関する記事を求め、インターネットの各方面へと旅立っていった…… [^1]

## はい

この記事では、procedural macros のライブラリを設計する方法について解説します。
結局、設計に関する記事なんてものはなかったんですね。
そもそも procedural macros に関す記事自体が少ないんですよね。

::: message
ライブラリを作ろうとする者へ向けた解説記事です（入門者へ向けた記事ではありません）。
:::

## 使うべきライブラリ

絶対に使うべきライブラリが4つあるので紹介しておきます。

### [proc-macro-error](https://docs.rs/proc-macro-error/latest/proc_macro_error/)

わかりやすいエラーを出すためのライブラリです。
標準で安定化されていない機能をライブラリ化したものなので、安定化後もコードをほぼ変更せずに対応できるため、使うべきです。

### [proc-macro2](https://docs.rs/proc-macro2/latest/proc-macro2/)

ユニットテスタブルなマクロ開発に必要なので使うべき。

### [quote](https://docs.rs/quote/latest/quote/)

TokenStream を構築するための最強のライブラリです。
使わない選択肢はないです。

### [syn](https://docs.rs/syn/latest/syn/)

TokenStream を構文木にパースしてくるライブラリです。
使わない選択肢はないです。

## 設計段階

### 注意事項

:::message alert
マクロを使わずに実現できないかを検討してください
:::

マクロで解決すべきことは

- 可変長引数の関数
- 大量のボイラープレートの自動生成

などです。

:::message alert
すでに存在していないかを確認してください
:::

すでにあるものが利用可能であれば、作る必要はありません。

### スコープの決定

最初にやることは、マクロで実現したいことを明確にすることです。
マクロでやること、マクロでやらないことを決定してください。

- ジェネリクスに対応するか？
- カスタマイズ性をもたせるか？

などをこの段階で考えてください。

### どのようなコードを生成すればよいのかを考える

もっとも難しいのがこのステップです。
マクロはあらゆるコードを入力に受け取り、コードを生成（またはコンパイルエラーを生成）する必要があります。
そのため、ありえる入力がどのようなものかを把握しておく必要があります。

まず、Rust の言語仕様と文法について完全に理解してください。
おのずとどのようなコードを生成するべきかが明らかになるでしょう。
完全に理解するのが難しい場合は、既存のライブラリを参考にするのが良いでしょう。

ありえる入力に対してエラーにする場合を考え、それらを除いた入力に対して動作するコードを考えます。

このステップでは、マクロライブラリをまだ書きません。
普通のコードを書いてください。
うまくコンパイルできて、ちゃんと動作するコードを思いつくことができればつぎのステップに進みましょう。

### 利用するマクロの形態の選択

- function-like procedural macros
- derive macros
- attribute macros

の3種類からの選択になります。

#### [function-like procedural macros](https://doc.rust-lang.org/reference/procedural-macros.html#function-like-procedural-macros)

```rust
#[proc_macro]
pub fn make_answer(_item: TokenStream) -> TokenStream {
    "fn answer() -> u32 { 42 }".parse().unwrap()
}
```

マクロに与えた入力をコードに変化するマクロの形態。
DSL からコードを生成したり、大量のボイラープレートを生成したりするときに用います。

#### [derive macros](https://doc.rust-lang.org/reference/procedural-macros.html#derive-macros)

```rust
#[proc_macro_derive(AnswerFn)]
pub fn derive_answer_fn(_item: TokenStream) -> TokenStream {
    "fn answer() -> u32 { 42 }".parse().unwrap()
}
```

```rust
extern crate proc_macro_examples;
use proc_macro_examples::AnswerFn;

#[derive(AnswerFn)]
struct Struct;
```

struct/enum/union を受け取り、それらが存在するモジュールに追加でなんらかのコードを自動生成できるマクロの形態です。

主に impl を自動生成するために用います。

#### [attribute macros](https://doc.rust-lang.org/reference/procedural-macros.html#attribute-macros)

```rust
#[proc_macro_attribute]
pub fn return_as_is(_attr: TokenStream, item: TokenStream) -> TokenStream {
    item
}
```

色々なものを受け取り、それを書き換える方法でコードを自動生成するマクロの形態です。
struct/enum/union 以外を受け取りたい場合はこれを用います。
derive macros と違ってコードを書き換えるため、書き換えたい場合はこちらを用います。

### マクロ内で利用する文法の検討

マクロユーザーにどのようなマクロを書かせるかを検討します。
基本的にはマクロで使う文法は Rust の文法としてパースできるように設計するのが望ましいです（syn を使って簡単にパースできるため）。
Rustの文法を完全に理解しているとここでも便利です。

derive macros を使う場合は、custom attributes を使うかどうかをこの段階で考えてください。

## 実際にコードを書く

必要なことは3つです。

- パースする
- 構文木から必要なデータをかき集める
- データから必要な `TokenStream` を構築する

### workspace 構成

最強の構成を教えます。

```tree:最強の構成はこれだ
.
├── library
│  └── ...
├── library_macros
│  └── ...
├── example
│  └── ...
└── tests
   └── ...
```

ポイントは、`library_macros` というクレートに procedural macros を封印してそれを `library` から再エクスポートすることです。
マクロライブラリはマクロしかかけないため、ライブラリがマクロ以外の機能を提供する場合はこの構成になります。
かなりの割合でマクロが生成するコードに自分のライブラリが提供するなにかを埋め込みたくなると思われるので、最終的にこれにたどり着く可能性が高いと思われます。
マクロだけで完結する場合は `library_macros` だけになります。

`example` は絶対に用意してください。

`tests` は実際にマクロを使ってみた結果を使ってみてテストをするためのクレートです。

### パースする

さて、ついにパースをするときです。
syn を使ってパースしていきましょう。
この段階でエラーになった場合はパースエラーになります。
どのような文法を要求しているのかをユーザーに伝えるエラーメッセージを出しましょう。

#### function-like procedural macros のパース

ユーザーから受け取った入力をパースしましょう。
気合でパーサを実装してください。
syn のドキュメントを読んでください。

```rust
use proc_macro::TokenStream;
use syn::{parse_macro_input, Result};
use syn::parse::{Parse, ParseStream};

struct MyMacroInput {
    /* ... */
}

impl Parse for MyMacroInput {
    fn parse(input: ParseStream) -> Result<Self> {
        /* 気合 */
    }
}

#[proc_macro]
pub fn my_macro(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as MyMacroInput);

    /* ... */
}
```

#### derive macros のパース

`syn::DeriveInput` としてパースします。

```rust
use proc_macro::TokenStream;
use syn::{parse_macro_input, DeriveInput, Result};
use syn::parse::{Parse, ParseStream};

#[proc_macro_derive(MyDerive, attributes(my_attr))]
pub fn my_macro(tokens: TokenStream) -> TokenStream {
    let input = parse_macro_input!(tokens as DeriveInput);

    /* ... */
}
```

`syn::DeriveInput` にはつぎのようなフィールドがあるので、コード生成に必要なデータをかき集めましょう。

```rust
pub struct DeriveInput {
    pub attrs: Vec<Attribute>,
    pub vis: Visibility,
    pub ident: Ident,
    pub generics: Generics,
    pub data: Data,
}
```

#### attribute macros のパース

何につけることができるのかによって違いますが、item にはRust のコードが入っているので `syn::???` にパースすればいいです。関数なら `syn::ItemFn` です。

attribute の引数を参照したい場合は第1引数に入っているので、それもパースしましょう。

```rust
use proc_macro::TokenStream;
use syn::{parse_macro_input, Result};
use syn::parse::{Parse, ParseStream};

#[proc_macro_attribute]
pub fn my_attr(attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as syn::ItemFn);

    /* ... */
}
```

### 必要なデータをかき集める

パースが完了したあとにすべきことは、コード生成に必要なデータが揃っているかを確認することです。
必要に応じて、「このアトリビュートはジェネリクスに対応していません」だとか「この Derive にはこのアトリビュートが必要です」だとかのエラーを発生させることが重要です。
適切にエラーをハンドリングして proc-macro-error でわかりやすいヒント付きのエラーを出しましょう。


### コードを生成する

必要なデータが集まったら、最終的に自動生成されるべきコードの TokenStream を構築します。

`quote!` マクロを使って構築します。
しっかりとすべての場合に対応したコードを構築するためには Rust の言語機能や文法を完全に理解している必要があります。

## まとめ

- マクロでしかできないことをマクロでやる
- すでに存在しているライブラリを調査する
- パースし、データを集め、`quote!` する
- Rust の言語機能と文法を完全に理解する

以上です。

[^1]: [『マクロスF』 第1話「クロース・エンカウンター」](https://www.youtube.com/watch?v=-_KxGpUvw5o)