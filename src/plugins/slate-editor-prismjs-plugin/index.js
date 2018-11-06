import Prism from "prismjs";

import Options from "./options";
import TOKEN_MARK from "./constants";

function PrismPlugin(optionParams) {
  const options = new Options(optionParams);

  return {
    decorateNode: (node, editor, next) => {
      if (!options.onlyIn(node)) {
        return next();
      }
      return decorateNode(options, node);
    },
    renderMark: options.renderMark,
    TOKEN_MARK
  };
}

function decorateNode(opts, block) {
  const grammarName = opts.getSyntax(block);
  const grammar = Prism.languages[grammarName];
  console.log("grammarName", Prism.languages);
  if (!grammar) {
    // Grammar not loaded
    return [];
  }

  // Tokenize the whole block text
  const texts = block.getTexts();
  const blockText = texts.map(t => t.text).join("\n");
  const tokens = Prism.tokenize(blockText, grammar);

  // The list of decorations to return
  const decorations = [];
  let textStart = 0;
  let textEnd = 0;

  texts.forEach(text => {
    textEnd = textStart + text.text.length;

    let offset = 0;

    function processToken(token, accu) {
      accu = accu || "";

      if (typeof token === "string") {
        if (accu) {
          const decoration = createDecoration({
            text,
            textStart,
            textEnd,
            start: offset,
            end: offset + token.length,
            className: `prism-token token ${accu}`
          });
          if (decoration) {
            decorations.push(decoration);
          }
        }
        offset += token.length;
      } else {
        accu = `${accu} ${token.type} ${token.alias || ""}`;

        if (typeof token.content === "string") {
          const decoration = createDecoration({
            text,
            textStart,
            textEnd,
            start: offset,
            end: offset + token.content.length,
            className: `prism-token token ${accu}`
          });
          if (decoration) {
            decorations.push(decoration);
          }

          offset += token.content.length;
        } else {
          // When using token.content instead of token.matchedStr, token can be deep
          for (let i = 0; i < token.content.length; i += 1) {
            processToken(token.content[i], accu);
          }
        }
      }
    }

    tokens.forEach(processToken);
    textStart = textEnd + 1; // account for added `\n`
  });

  console.log("decorations", decorations);

  return decorations;
}

function createDecoration({ text, textStart, textEnd, start, end, className }) {
  if (start >= textEnd || end <= textStart) {
    return null;
  }

  start = Math.max(start, textStart);
  end = Math.min(end, textEnd);

  start -= textStart;
  end -= textStart;

  return {
    anchor: {
      key: text.key,
      offset: start
    },
    focus: {
      key: text.key,
      offset: end
    },
    mark: { type: "prism-token", data: { className } }
  };
}

export default PrismPlugin;
