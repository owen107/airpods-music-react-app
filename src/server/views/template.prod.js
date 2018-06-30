import serialize from 'serialize-javascript';

export default ({ content, helmet, store }) => {
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/dist/style.css"/>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/dist/client.js"></script>
      </body>
    </html>
  `;
}