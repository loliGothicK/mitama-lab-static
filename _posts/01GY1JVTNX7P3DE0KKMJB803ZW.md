---
title: 'ライセンスコンプライアンスしてますか？'
excerpt: '聴かせてあげる、ライセンスコンプライアンスの歌を！'
coverImage: '/assets/blog/01GY1JVTNX7P3DE0KKMJB803ZW/cover.svg'
date: '2023-04-15 04:30:37.245313841 UTC'
author:
  name: Mitama
  picture: '/assets/blog/authors/mitama.jpg'
ogImage:
  url: '/assets/blog/01GY1JVTNX7P3DE0KKMJB803ZW/cover.svg'
---

人類がソフトウェアの存続を目的とし、宇宙移民を開始してすでに半世紀以上。
様々なライセンスと遭遇し、一大星間文明を築きつつあった。
ライセンスコンプライアンス違反。ある日突然罰金を課される。
人々はいつどこで起こるとも知らないコンプライアンスリスクに怯えることとなった。
だが、その脅威に完全と立ち向かう者たちがいた。
戦術音楽ユニット walkure－彼女たちの時空を超えた歌声と、ライセンスを守り戦ういなむのみたまのかみ。
いま、あらたな継続的なライセンス・コンプライアンスが幕を開ける。[^1]

## FOSSA は神秘

https://fossa.com/

FOSSA はライセンス違反をしていないかをチェックしてくれるサービスだ。

Myリポジトリだと、[clippy-check](https://github.com/LoliGothick/clippy-check) や [rustfmt-check](https://github.com/LoliGothick/rustfmt-check) がこれを使わせていただいており、大変に便利だ。
というのも、自分が設定しているライセンスが依存ライブラリのライセンスと互換性があるのかを勝手に判断してくれるからである。
めちゃくちゃおすすめ。

さて、FOSSA は Rust に対応しているらしい[^2]とのことで大喜びした僕は Rust のリポジトリに FOSSA を適用した。

![](https://storage.googleapis.com/zenn-user-upload/e5b63c1effa6-20230415.png)

やったー、All Check Passed だー。ん・・・？？？

![](https://storage.googleapis.com/zenn-user-upload/ea078d438800-20230415.png)

そう、このツールはおそらく Cargo Workspace に対応していないのである。

![](https://storage.googleapis.com/zenn-user-upload/7895e4e4f486-20230415.png)

そんな、FOSSA が使えない・・・

## cargo-deny は希望

悲しみに包まれたいなみのみたまのかみは代替ツールを探した。
そして見つけたのが、 [cargo-deny](https://github.com/EmbarkStudios/cargo-deny) である。

普通に便利。

```shell
cargo deny init
```

をすると設定ファイルを作ってくれる。

### cargo deny check license

流石に設定しているライセンスが依存ライブラリのライセンスと互換性があるのかを勝手に判断してくれたりはしない。
設定ファイルにホワイトリストとして許可するライセンスを羅列する必要がある。

### cargo deny check advisories

advisory database から issue がないかを探してくれる機能もある。



[^1]: [『マクロスΔ』 mission 01 「戦場のプロローグ」](https://www.youtube.com/watch?v=afma-8wvPNQ)
[^2]: https://docs.fossa.com/docs/supported-languages