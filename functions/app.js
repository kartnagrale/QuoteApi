// functions/quote.js
exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ quote: "Example quote", author: "Anonymous" })
    };
  };
  