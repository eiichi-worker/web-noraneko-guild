# 開発ドキュメント

## デプロイ

```ps1
cd .\hosting\app\; yarn build;
cd ..\..\; yarn firebase deploy --only hosting;
```

## ローカルテスト

```bash
yarn firebase serve
```


## Yarn

- モジュールをアップデート

    ```bash
    yarn upgrade --latest
    ```
