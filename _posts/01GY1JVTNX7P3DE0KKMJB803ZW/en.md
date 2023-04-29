---
title: 'Are you licence compliant?'
excerpt: 'Let me hear it, a song from Licensed Compliance!'
coverImage: '/assets/blog/01GY1JVTNX7P3DE0KKMJB803ZW/cover.svg'
date: '2023-04-15 04:30:37.245313841 UTC'
author:
  name: Mitama
  picture: '/assets/blog/authors/mitama.jpg'
ogImage:
  url: '/assets/blog/01GY1JVTNX7P3DE0KKMJB803ZW/cover.svg'
---

More than half a century has already passed since mankind began space migration for the survival of software.
We encountered various licences and were building a major interstellar civilisation.
But there are still numerous unknown threats in space. ......
Licence compliance violations. One day you will suddenly be fined.
People were frightened of compliance risks that could happen anywhere and at any time.
But there were those who dared to face the threat.
The tactical music unit walkure - their voices transcending time and space, and Mitama, who fight to protect the licence.
Now, a new and continuous licence compliance begins. [^1]

## FOSSA is a mystery

https://fossa.com/

FOSSA is a service that checks for licence violations.

In My Repository, [clippy-check](https://github.com/LoliGothick/clippy-check) and [rustfmt-check](https://github.com/LoliGothick/rustfmt-check ) use it and find it very useful.
They are very useful because they determine on their own whether the licence you have set up is compatible with the licence of the dependent libraries.
Highly recommended.

Well, I was overjoyed to hear that FOSSA is compatible with Rust[^2], so I applied FOSSA to the Rust repository.

![](https://storage.googleapis.com/zenn-user-upload/e5b63c1effa6-20230415.png)

Yay, All Check Passed. Hm...?

![](https://storage.googleapis.com/zenn-user-upload/ea078d438800-20230415.png)

Yes, this tool is ~~probably~ not compatible with Cargo Workspace.

https://twitter.com/getfossa/status/1648782084075409408

![](https://storage.googleapis.com/zenn-user-upload/7895e4e4f486-20230415.png)

Oh no, I can't use FOSSA...

## cargo-deny は希望

In her grief, Nami-no-Mitama no Kami looked for an alternative tool.
She found [cargo-deny](https://github.com/EmbarkStudios/cargo-deny).

Usually convenient.

To create a configuration file, run:

```shell
cargo deny init
```

### cargo deny check license

Quicksilver does not determine on its own whether the licence you are setting up is compatible with the licence of the dependent library.
You need to list the licences you want to allow as a whitelist in the configuration file.

### cargo deny check advisories

There is also a function to search the advisory database for issues.


[^1]: [『マクロスΔ』 mission 01 「戦場のプロローグ」](https://www.youtube.com/watch?v=afma-8wvPNQ)
[^2]: https://docs.fossa.com/docs/supported-languages