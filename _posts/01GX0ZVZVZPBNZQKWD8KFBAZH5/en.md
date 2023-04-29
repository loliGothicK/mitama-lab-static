---
title: 'Macros Frontier'
excerpt: 'Procedural Macros Design'
coverImage: '/assets/blog/01GX0ZVZVZPBNZQKWD8KFBAZH5/cover.svg'
date: '2023-04-02 12:42:57.791510309 UTC'
author:
  name: Mitama
  picture: '/assets/blog/authors/mitama.jpg'
ogImage:
  url: '/assets/blog/01GX0ZVZVZPBNZQKWD8KFBAZH5/cover.svg'
---

## The year is 2059 AD.

There was once a war against the giants called PROCEDURAL MACROS.
After experiencing the threat of extinction in his first battle against metaprogramming, I travelled to various parts of the internet in search of articles on the design of the proc macro library. ...... [^1]

## Few minutes later...

This article describes how to design a library of procedural macros.
After all, there was no such thing as an article about designing one.
There aren't many articles on procedural macros to begin with.

::: message
This is an explanatory article aimed at those who want to build a library (not an introductory article).
:::

## Libraries to use.

There are four libraries that you should definitely use.

### [proc-macro-error](https://docs.rs/proc-macro-error/latest/proc_macro_error/)

This is a library for easy-to-understand errors.
It should be used because it is a library of functions that are not stabilised in the standard and can be handled after stabilisation with almost no code changes.

### [proc-macro2](https://docs.rs/proc-macro2/latest/proc-macro2/)

It should be used because it is necessary for developing unit-testable macros.

### [quote](https://docs.rs/quote/latest/quote/)

It is the most powerful library for building TokenStreams.
There is no choice not to use it.

### [syn](https://docs.rs/syn/latest/syn/)

This library parses TokenStream into a parse tree.
There is no choice not to use it.

## design stage

### Notes.

:::message alert
Consider whether this can be achieved without macros
:::

What needs to be resolved at the macro level is.

- Functions with variable length arguments
- Automatic generation of large numbers of boiler plates

These include.

:::message alert
Check if it does not already exist.
:::

There is no need to create one if one is already available.

### Determining the scope

The first thing to do is to identify what you want to achieve with macros.
Decide what you will and will not do with macros.

- Will it be generics compliant?
- Do you want to make it customisable?

and so on should be considered at this stage.

### Consider what code to generate.

The most difficult step is this step.
The macro needs to take any code as input and generate code (or generate compilation errors).
Therefore, you need to know what the possible inputs are.

First, you should have a thorough understanding of the Rust language specification and syntax.
It will naturally become clear what code you should generate.
If it is difficult to fully understand, it is a good idea to refer to existing libraries.

Consider the case where you make an error for possible inputs, and consider the code that works for the inputs without them.

In this step, do not write the macro library yet.
Write normal code.
If you can compile it well and come up with code that works properly, you can move on to the next step.

### Selecting the form of macro to be used.

- function-like procedural macros
- derive macros
- attribute macros

The choice is between three types of

#### [function-like procedural macros](https://doc.rust-lang.org/reference/procedural-macros.html#function-like-procedural-macros)

```rust
#[proc_macro]
pub fn make_answer(_item: TokenStream) -> TokenStream {
    "fn answer() -> u32 { 42 }".parse().unwrap()
}
```

A form of macro that transforms the input given to the macro into code.
Used to generate code from a DSL or to generate a large number of boilerplates.

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

It is a form of macro that can take struct/enum/union and automatically generate some code in addition to the module in which they exist.

It is mainly used to automatically generate impls.

#### [attribute macros](https://doc.rust-lang.org/reference/procedural-macros.html#attribute-macros)

```rust
#[proc_macro_attribute]
pub fn return_as_is(_attr: TokenStream, item: TokenStream) -> TokenStream {
    item
}
```

This is a form of macro that takes various things and automatically generates code in a way that rewrites it.
Use this if you want to receive something other than struct/enum/union.
Unlike derive macros, this is used if you want to rewrite the code, because it rewrites the code.

### Consideration of the grammar to be used within the macro.

Consider what macros you want macro users to write.
Basically, the syntax used in macros should be designed to be parsable as a Rust syntax (as it can be easily parsed using syn).
A thorough understanding of Rust syntax is also useful here.

If derive macros are used, consider at this stage whether custom attributes should be used.

## Writing the actual code

Three things are needed.

- Parsing.
- Scrape the necessary data from the syntax tree.
- Build the required `TokenStream` from the data.

### workspace Configuration

The best configuration is taught.

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

The point is to seal procedural macros in a crate called `library_macros` and re-export them from the `library`.
Macro libraries only apply macros, so if your library provides non-macro functionality, this is the configuration to use.
It is likely that you will eventually arrive at this, as a significant proportion of the time you will want to embed something provided by your library in the code generated by the macros.
If you only want to use macros, you will only need `library_macros`.

`example` should definitely be provided.

`tests` is a crate for testing the results of using the actual macros.

### Parsing.

Now it is time to finally parse.
Let's parse using syn.
If an error occurs at this stage, it is a parsing error.
Give the user an error message telling them what syntax is required.

#### Parsing function-like procedural macros

Parse the input received from the user.
Implement the parser with gusto.
Read the syn documentation.

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

#### Parsing of derive macros

Parse as `syn::DeriveInput`.

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

The `syn::DeriveInput` contains the following fields to gather the data needed for code generation.

```rust
pub struct DeriveInput {
    pub attrs: Vec<Attribute>,
    pub vis: Visibility,
    pub ident: Ident,
    pub generics: Generics,
    pub data: Data,
}
```

#### Parsing of attribute macros

It depends on what you can attach it to, but the item contains Rust code, so you can parse it into `syn::??? `, you can parse it into `syn::ItemFn`. If it's a function, it's `syn::ItemFn`.

If you want to refer to the attribute argument, it is in the first argument, so parse that too.

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

### Gather the data you need.

What you should do after parsing is complete is to check that you have all the data you need for code generation.
If necessary, it is important to generate errors such as 'This attribute does not support generics' or 'This Derive requires this attribute'.
Handle errors properly and generate errors with easy-to-understand hints in proc-macro-error.

### Generate code

Once the required data has been gathered, build a TokenStream of code that should eventually be generated automatically.

`quote!` macros to build it.
A thorough understanding of Rust's language features and syntax is required to build solid all-case code.

## Summary

- Do macro things that only macro can do.
- Investigate libraries that already exist.
- Parsing, collecting data and `quote!`.
- Fully understand the language features and syntax of Rust

That's all.

[^1]: [『マクロスF』 第1話「クロース・エンカウンター」](https://www.youtube.com/watch?v=-_KxGpUvw5o)