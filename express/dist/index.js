"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", {value: true});
const cors = __importStar(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const express = __importStar(require("express"));
// Create a new express application instance
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map
