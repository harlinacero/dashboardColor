(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory(
      require("devexpress-dashboard/common"),
      require("jquery"),
      require("devexpress-dashboard/model/index.metadata")
    );
  else if (typeof define === "function" && define.amd)
    define([
      "devexpress-dashboard/common",
      "jquery",
      "devexpress-dashboard/model/index.metadata"
    ], factory);
  else {
    var a =
      typeof exports === "object"
        ? factory(
            require("devexpress-dashboard/common"),
            require("jquery"),
            require("devexpress-dashboard/model/index.metadata")
          )
        : factory(
            root["DevExpress"]["Dashboard"],
            root["$"],
            root["DevExpress"]["Dashboard"]["Metadata"]
          );
    for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
  }
})(window, function(
  __WEBPACK_EXTERNAL_MODULE__0__,
  __WEBPACK_EXTERNAL_MODULE__1__,
  __WEBPACK_EXTERNAL_MODULE__2__
) {
  return (function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      });
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      module.l = true;
      return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
      }
    };
    __webpack_require__.r = function(exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module"
        });
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    };
    __webpack_require__.t = function(value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key)
          );
      return ns;
    };
    __webpack_require__.n = function(module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module["default"];
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
    __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__((__webpack_require__.s = 29));
  })({
    0: function(module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__0__;
    },
    1: function(module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__1__;
    },
    2: function(module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__2__;
    },
    29: function(module, exports, __webpack_require__) {
      var editorTemplates = __webpack_require__(2).editorTemplates;
      console.log(editorTemplates);
      var CustomItemViewer = __webpack_require__(0).CustomItemViewer;
      var $ = __webpack_require__(1);
      var customItemSimpleCardMeta = {
        // Ask for mesures and dimensions to bind data
        bindings: [
          {
            propertyName: "customMeasure",
            dataItemType: "Measure",
            displayName: "Medidas"
          },
          {
            propertyName: "customDimensions",
            dataItemType: "Dimension",
            array: true,
            displayName: "Dimensiones"
          }
        ],
        // Settings of values, measures and dimensions
        properties: [
          {
            propertyName: "showHeaders",
            editor: editorTemplates.buttonGroup,
            displayName: "Show Headers",
            sectionName: "Custom Options",
            values: {
              Auto: "Auto",
              Off: "Off",
              On: "On"
            },
            defaultVal: "Auto"
          },
          {
            propertyName: "diectionText",
            editor: editorTemplates.buttonGroup,
            displayName: "Dirección Texto",
            sectionName: "Custom Options",
            values: {
              Left: "Left",
              Center: "Center",
              Right: "Right"
            },
            defaultVal: "Left"
          },
          {
            propertyName: "addImage",
            editor: editorTemplates.image,
            displayName: "Imagen",
            sectionName: "Custom Options",
            defaultVal: "url"
          }
        ],
        icon: "CustomItemSimpleCard",
        title: "Simple Card"
      };
      var __extends =
        (this && this.__extends) ||
        (function() {
          var extendStatics = function(d, b) {
            extendStatics =
              Object.setPrototypeOf ||
              ({
                __proto__: []
              } instanceof Array &&
                function(d, b) {
                  d.__proto__ = b;
                }) ||
              function(d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
              };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype =
              b === null
                ? Object.create(b)
                : ((__.prototype = b.prototype), new __());
          };
        })();
      var customItemSimpleCard = (function(_super) {
        __extends(customItemSimpleCard, _super);
        function customItemSimpleCard(model, container, options) {
          _super.call(this, model, container, options);
          var _this = this;
          this.$div = undefined;
          this.$divImg = undefined;
          // Custom header Event
          this.subscribe("showHeaders", function(mode) {
            _this._update(mode);
          });

          // Custom
          this.subscribe("diectionText", function(mode) {
            var customTexts = document.getElementsByClassName("customText");
            for (let text of customTexts) {
              text.style.textAlign = mode;
            }
          });
          this.subscribe("addImage", function(mode) {
            document.getElementById("ItemPreview").src =
              "data:image/png;base64," + mode;
          });
        }
        customItemSimpleCard.prototype.renderContent = function(
          element,
          changeExisting,
          afterRenderCallback
        ) {
          let $element = $(element);
          if (!changeExisting) {
            $element.empty();
            $element.css("display", "flex");
            // $element.css("flex-column", "column");
            $element.css("overflow", "hidden");
            $element.css("padding", "0.5em");

            this.$div = $("<div/>", {
              cellpadding: 0,
              cellspacing: 0,
              border: 1,
              width: "100%"
            });

            this.$divImg = $("<div/>", {
              cellpadding: 0,
              cellspacing: 0,
              border: 1,
              width: "100%"
            });

            $element.append(this.$divImg);
            $element.append(this.$div);
          }
          this._update(this.getPropertyValue("showHeaders"));
          this._update(this.getPropertyValue("diectionText"));
          this._update(this.getPropertyValue("addImage"));
        };
        customItemSimpleCard.prototype._update = function(mode) {
          var _this = this;
          this.$div.empty();
          if (mode != "Off") {
            var bindingValues = this.getBindingValue("customDimensions").concat(
              this.getBindingValue("customMeasure")
            );
            this._addTableRow(
              bindingValues.map(function(item) {
                return item.displayName();
              }),
              true
            );
          }
          this.iterateData(function(rowDataObject) {
            var valueTexts = rowDataObject
              .getDisplayText("customDimensions")
              .concat(rowDataObject.getDisplayText("customMeasure"));
            _this._addTableRow(valueTexts, false);
          });
          this._addImage(bindingValues.map(function(item) {}), true);
        };
        /**
         * Properties of desing card
         */
        // About text properties
        customItemSimpleCard.prototype._addTableRow = function(
          texts,
          isHeader
        ) {
          var tag = isHeader ? "h6" : "h3";
          var cells = texts.map(function(text) {
            return "<" + tag + ' class="customText">' + text + "</" + tag + ">";
          });
          this.$div.append($("<div/>").html(cells.join("")));
        };

        // About Image properties
        customItemSimpleCard.prototype._addImage = function() {
          this.$divImg.append(
            $(
              '<div id="imageContent" style="width: 100%; height: 100%; resize: vertical;">' +
                '<img id="ItemPreview" src="" style="height: 100%; width: 100%;"/></div>'
            )
          );
        };
        return customItemSimpleCard;
      })(CustomItemViewer);

      /**
       * Icon in tool box
       */
      var CUSTOM_ITEM_SIMPLE_CARD_ICON =
        '<svg id="' +
        customItemSimpleCardMeta.icon +
        '" viewBox="0 0 18 18"><path fill="#39A866" d="M8.749,9.934c0,0.247-0.202,0.449-0.449,0.449H4.257c-0.247,0-0.449-0.202-0.449-0.449S4.01,9.484,4.257,9.484H8.3C8.547,9.484,8.749,9.687,8.749,9.934 M7.402,12.627H4.257c-0.247,0-0.449,0.202-0.449,0.449s0.202,0.449,0.449,0.449h3.145c0.247,0,0.449-0.202,0.449-0.449S7.648,12.627,7.402,12.627 M8.3,6.339H4.257c-0.247,0-0.449,0.202-0.449,0.449c0,0.247,0.202,0.449,0.449,0.449H8.3c0.247,0,0.449-0.202,0.449-0.449C8.749,6.541,8.547,6.339,8.3,6.339 M18.631,4.543v10.78c0,0.248-0.202,0.45-0.449,0.45H2.011c-0.247,0-0.449-0.202-0.449-0.45V4.543c0-0.247,0.202-0.449,0.449-0.449h16.17C18.429,4.094,18.631,4.296,18.631,4.543 M17.732,4.993H2.46v9.882h15.272V4.993z M16.371,13.078c0,0.247-0.202,0.449-0.449,0.449H9.646c-0.247,0-0.449-0.202-0.449-0.449c0-1.479,0.883-2.747,2.162-3.299c-0.434-0.418-0.714-1.008-0.714-1.642c0-1.197,0.997-2.246,2.133-2.246s2.134,1.049,2.134,2.246c0,0.634-0.28,1.224-0.714,1.642C15.475,10.331,16.371,11.6,16.371,13.078M11.542,8.137c0,0.622,0.539,1.348,1.235,1.348s1.235-0.726,1.235-1.348c0-0.622-0.539-1.348-1.235-1.348S11.542,7.515,11.542,8.137 M15.435,12.629c-0.214-1.273-1.323-2.246-2.657-2.246s-2.431,0.973-2.644,2.246H15.435z" /></svg>';
      function SimpleCardItemExtension(_designer) {
        this.name = "CustomItemSimpleCard";
        this.metaData = customItemSimpleCardMeta;
        this.createViewerItem = function(model, $element, content) {
          return new customItemSimpleCard(model, $element, content);
        };
        if (!!_designer) {
          _designer.registerIcon(CUSTOM_ITEM_SIMPLE_CARD_ICON);
        }
      }
      module.exports = {
        SimpleCardItemExtension: SimpleCardItemExtension
      };
    }
  });
});
