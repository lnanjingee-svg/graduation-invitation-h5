# GitHub Pages 上传步骤

## 1. 解压发布包

使用 `_deploy/graduation-invitation-h5-github-pages.zip`。

解压后会看到这些内容：

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `.nojekyll`

只上传这些内容，不要上传 PDF、原始设计图或 `_deploy` 文件夹。

## 2. 上传到 GitHub 仓库

打开你的仓库：

https://github.com/lnanjingee-svg/graduation-invitation-h5

如果仓库是空的：

1. 点击 `uploading an existing file`
2. 把解压后的文件全部拖进去
3. 提交信息写：`Publish graduation invitation H5`
4. 点击 `Commit changes`

如果仓库不是空的：

1. 点击 `Add file`
2. 选择 `Upload files`
3. 把解压后的文件全部拖进去
4. 点击 `Commit changes`

## 3. 开启 GitHub Pages

1. 进入仓库 `Settings`
2. 左侧找到 `Pages`
3. `Build and deployment` 里选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 `Save`

## 4. 等待并访问

首次发布通常需要等待 1-3 分钟。

最终链接应该是：

https://lnanjingee-svg.github.io/graduation-invitation-h5/

如果刚打开是 404，等一会儿刷新即可。

## 5. 发微信前检查

用手机浏览器先打开最终链接，确认：

- 封面能显示
- 点击后唱片动画正常
- 唱臂正常落下
- 纸飞机背景正常
- 邀请信息正常出现

确认无误后，再把链接发到微信。
