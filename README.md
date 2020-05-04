# Chatosaurus
A Copy of the Discord chat UI

## Webpack

Webpack is a module bundler. Its purpose is to bundle JavaScript files for usage in a browser, also transforms other resources and assets.

##### Modules
- HTML
    - html-webpack-plugin:
        - This plugin takes 'template.html' and outputs 'index.html'. It also add \<link> for css and \<script> for js
    - html-loader:
        - This loader imports every loadable attributes (for example - \<img src="image.png">) so then file-loader can move the file and change the 'src' in the output HTML file
    
- CSS
    - sass-loader:
        - This loader takes the scss file and transposes it to css.
    - css-loader:
        - This loader takes the css from above and exports it to the js bundle
    - mini-css-extract-plugin:
        - This plugin takes the css out of the js bundle and makes a new css file in the public folder
        
- SVG
    - svg-url-loader
        - This loader replaces .svg backgrounds with just the svg data required in the css file. This reduces the amount of GET requests due to being integrated into the css file.
        
- Images
    - file-loader
        - This loader will use the 'src' attributes found by html-loader and moves the file to the assets folder. The output HTML 'src' will also change as required
        
