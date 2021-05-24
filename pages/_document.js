import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import React from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href={`${process.env.basePath}/vendors/bootstrap.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.basePath}/vendors/froala_editor/css/froala_editor.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.basePath}/vendors/froala_editor/css/froala_editor.pkgd.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.basePath}/vendors/froala_editor/css/plugins.pkgd.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.basePath}/vendors/all.css`}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap"
            rel="stylesheet"
          />
          <title>
            ระบบการจองยานพาหนะสำหรับมหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
            วิทยาเขตนครราชสีมา
          </title>
        </Head>
        <body>
          <Main />
          <script src={`${process.env.basePath}/initialMap.js`} />
          <script src={`${process.env.basePath}/vendors/jquery-3.5.1.min.js`} />
          <script
            src={`${process.env.basePath}/vendors/bootstrap.bundle.min.js`}
          />
          <script
            src={`${process.env.basePath}/vendors/froala_editor/js/froala_editor.pkgd.min.js`}
          />
          <script
            src={`${process.env.basePath}/vendors/froala_editor/js/plugins.pkgd.min.js`}
          />
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlZjv59KT7qCJyyVh9OBOJ9Ikw7Oq6d_Q&callback=initMap&libraries=places&v=weekly&language=th"
            async
          ></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
