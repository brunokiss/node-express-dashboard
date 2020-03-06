const source = fs.readFileSync(path.join(process.cwd(), 'public/javascripts/log-viewer.js'), 'utf8');
const logViewer = jscs(source);

describe('log-viewer.js', () => {
  it('should display the message from the WebSocket server @log-viewer-onmessage', () => {
    const onmessage = logViewer.findPropertyAssignment('connection', 'onmessage');
    const onmessageAssignmentMatch = {
      "operator": "=",
      "type": "AssignmentExpression",
      "right.params[0].name": "event"
    }
    assert(matchObj(onmessage, onmessageAssignmentMatch), 'Are you assigning a function handler to `connection.onmessage` with a param of `event`?');

    const onmessageArrowFunction = { 
      'right.type': 'ArrowFunctionExpression', 
    };
    const onmessageHandlerFunction = { 
      'right.type': 'FunctionExpression',
    };
    assert(matchObj(onmessage, onmessageArrowFunction) || matchObj(onmessage, onmessageHandlerFunction), 'Are you assigning a handler function to `connection.onmessage`?');

    const onmessageMatch = {
      "right.body.body[0].expression.left.object.name": "logWindow",
      "right.body.body[0].expression.left.property.name": "innerHTML",
      "right.body.body[0].expression.right.expressions[0].object.name": "event",
      "right.body.body[0].expression.right.expressions[0].property.name" : "data"
    }
    assert(matchObj(onmessage, onmessageMatch), 'Are you setting the `innerHTML` property of `logWindow` to `event.data`?');
  });
});