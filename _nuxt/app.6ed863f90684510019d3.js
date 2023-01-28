webpackJsonp(
  [2],
  {
    "/NKE": function (e, t, n) {
      "use strict";
      var i = n("wQtD"),
        o = n("SHkU");
      var r = function (e) {
          n("r6qT");
        },
        a = n("VU/8")(i.a, o.a, !1, r, "data-v-0536f20d", null);
      t.a = a.exports;
    },
    0: function (e, t) {},
    "0F0d": function (e, t, n) {
      "use strict";
      t.a = {
        name: "no-ssr",
        props: ["placeholder"],
        data: function () {
          return { canRender: !1 };
        },
        mounted: function () {
          this.canRender = !0;
        },
        render: function (e) {
          return this.canRender
            ? this.$slots.default && this.$slots.default[0]
            : e(
                "div",
                { class: ["no-ssr-placeholder"] },
                this.$slots.placeholder || this.placeholder
              );
        },
      };
    },
    "0rCp": function (e, t, n) {
      "use strict";
      var i = n("Dd8w"),
        o = n.n(i),
        r = n("YMuy"),
        a = n("LB67"),
        s = n("JtYm"),
        c = n("HUXV");
      t.a = o()({}, r.a, a.a, s.a, c.a);
    },
    "0xYM": function (e, t, n) {
      var i = n("vXEZ");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("34fa0f4a", i, !0, { sourceMap: !1 });
    },
    1: function (e, t) {},
    "1AqL": function (e, t, n) {
      "use strict";
      t.a = function (e) {
        return (
          e.on("hubpress:request-local-synchronization", function (e) {
            console.info(
              "lokijsPlugin - hubpress:request-local-synchronization"
            ),
              console.log(
                "lokijsPlugin - hubpress:request-local-synchronization",
                e
              );
            var t = l.getCollection("content"),
              n = e.nextState.posts || [];
            return (
              (e.nextState.posts = n.map(function (e) {
                e.type = e.type || "post";
                var n = t.findOne({ "original.name": e.name }),
                  i = void 0;
                return (
                  n
                    ? (console.log("lokijsPlugin - post found", e.name),
                      (n.original && n.original.content !== e.content) ||
                      n.published !== e.published
                        ? (console.log(
                            "lokijsPlugin - post have changed",
                            e.name
                          ),
                          (e.$loki = n.$loki),
                          (e.meta = n.meta),
                          (i = t.update(e)))
                        : (console.log(
                            "lokijsPlugin - post have not changed",
                            e.name
                          ),
                          (i = n)))
                    : (console.log("lokijsPlugin - post not found", e.name),
                      (e._id = s.a.v4()),
                      (i = t.insert(e))),
                  l.saveDatabase(),
                  i
                );
              })),
              e
            );
          }),
          e.on("application:receive-config", function (e) {
            if (
              (console.info("lokijsPlugin - application:receive-config"),
              console.log("lokijsPlugin - application:receive-config", e),
              l)
            )
              return e;
            var t = new u("hubpress");
            return (
              console.log("lokijs indexed", t),
              (l = new c(
                "hubpress-" +
                  e.nextState.config.meta.username +
                  "-" +
                  e.nextState.config.meta.repositoryName,
                { adapter: t }
              )).loadDatabase(),
              l.getCollection("content") ||
                l.addCollection("content", { unique: ["name"] }),
              (window.lokiDb = l),
              e
            );
          }),
          e.on("hubpress:request-local-posts", function (e) {
            console.info("lokijsPlugin - hubpress:request-local-posts"),
              console.log("lokijsPlugin - hubpress:request-local-posts", e);
            var t = l
              .getCollection("content")
              .chain()
              .find({})
              .simplesort("name", { desc: !0 })
              .data();
            return (e.nextState.posts = t), e;
          }),
          e.on("requestSelectedPost", function (e) {
            console.info("lokijsPlugin - requestSelectedPost"),
              console.log("lokijsPlugin - requestSelectedPost", e);
            var t = l
              .getCollection("content")
              .findOne({ _id: e.data.post._id });
            return (e.data.selectedPost = t), e;
          }),
          e.on("hubpress:request-local-post", function (e) {
            console.info("lokijsPlugin - hubpress:request-local-post"),
              console.log("lokijsPlugin - hubpress:request-local-post", e);
            var t = l
              .getCollection("content")
              .findOne({ _id: e.nextState.post._id });
            return (e.nextState.post = t || { _id: e.nextState.post._id }), e;
          }),
          e.on("requestSaveLocalPost", function (e) {
            console.info("lokijsPlugin - requestSaveLocalPost"),
              console.log("lokijsPlugin - requestSaveLocalPost", e);
            var t = l.getCollection("content");
            if (
              t.findOne({
                _id: { $ne: e.nextState.post._id },
                name: e.nextState.post.name,
              })
            )
              throw new Error(
                "Post with the name " + e.nextState.post.name + " already exist"
              );
            var n = t.findOne({ _id: e.nextState.post._id });
            if (n) {
              var i = o()(n, e.nextState.post);
              (i.type = e.nextState.post.type || n.type || "post"),
                (e.nextState.post = t.update(i));
            } else e.nextState.post = t.insert(e.nextState.post);
            return l.saveDatabase(), e;
          }),
          e.on("requestLocalPublishedPosts", function (e) {
            console.info("lokijsPlugin - requestLocalPublishedPosts"),
              console.log("lokijsPlugin - requestLocalPublishedPosts", e);
            var t = l
              .getCollection("content")
              .chain()
              .find({
                "original.name": { $ne: null },
                published: { $eq: 1 },
                type: { $eq: "post" },
              })
              .simplesort("name", { desc: !0 })
              .data();
            return (e.nextState.publishedPosts = t), e;
          }),
          e.on("requestLocalPublishedPages", function (e) {
            console.info("lokijsPlugin - requestLocalPublishedPages"),
              console.log("lokijsPlugin - requestLocalPublishedPages", e);
            var t = l
              .getCollection("content")
              .chain()
              .find({
                "original.name": { $ne: null },
                published: { $eq: 1 },
                type: { $eq: "page" },
              })
              .simplesort("name", { desc: !0 })
              .data();
            return (e.nextState.publishedPages = t), e;
          }),
          e.on("requestDeleteLocalPost", function (e) {
            return (
              console.info("lokijsPlugin - requestDeleteLocalPost"),
              console.log("lokijsPlugin - requestDeleteLocalPost", e),
              l
                .getCollection("content")
                .findAndRemove({ _id: e.nextState.post._id }),
              l.saveDatabase(),
              e
            );
          }),
          {
            getName: function () {
              return "lokijsPlugin";
            },
          }
        );
      };
      var i = n("woOf"),
        o = n.n(i),
        r = n("M4fF"),
        a = (n.n(r), n("RJtx")),
        s = n.n(a),
        c = n("7WZj"),
        u = (n.n(c), n("nM7d")),
        l = (n.n(u), void 0);
    },
    "1H2/": function (e, t, n) {
      var i = { "./index.ts": "fbRD" };
      function o(e) {
        return n(r(e));
      }
      function r(e) {
        var t = i[e];
        if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
        return t;
      }
      (o.keys = function () {
        return Object.keys(i);
      }),
        (o.resolve = r),
        (e.exports = o),
        (o.id = "1H2/");
    },
    2: function (e, t) {},
    3: function (e, t) {},
    "3fVB": function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        "ui.top.attached.tabular.menu tab{height:100%}.settings-container{height:100%;overflow:auto}.settings-content{margin-top:60px}.settings-content .menu .item:hover{cursor:pointer}",
        "",
      ]);
    },
    "3oxy": function (e, t, n) {
      "use strict";
      t.a = function (e) {
        return (
          e.on("application:routes", function (e) {
            return (
              console.info("dashboardPlugin - application:routes"),
              console.log("dashboardPlugin - application:routes", e),
              e.nextState.routes.push({
                id: "dashboard",
                entries: [
                  { path: "dashboard", name: "dashboard", component: i.a },
                ],
              }),
              console.log("dashboardPlugin - application:routes - return", e),
              e
            );
          }),
          {
            getName: function () {
              return "dashboardPlugin";
            },
          }
        );
      };
      var i = n("ThI1");
    },
    "4/hK": function (e, t, n) {
      var i = n("cOI0");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("4a61b6b0", i, !0, { sourceMap: !1 });
    },
    "6Ndi": function (e, t, n) {
      "use strict";
      var i = n("LEOq"),
        o = n.n(i);
      t.a = {
        fireRequestConfig: function (e) {
          return o.a.fire("requestConfig", e);
        },
        fireReceiveConfig: function (e) {
          return o.a.fire("receiveConfig", e);
        },
        fireRequestSaveConfig: function (e) {
          return o.a.fire("requestSaveConfig", e);
        },
        fireReceiveSaveConfig: function (e) {
          return o.a.fire("receiveSaveConfig", e);
        },
        fireRequestTheme: function (e) {
          return o.a.fire("hubpress:request-theme", e);
        },
        fireReceiveTheme: function (e) {
          return o.a.fire("hubpress:receive-theme", e);
        },
        fireRequestSavedAuth: function (e) {
          return o.a.fire("requestSavedAuth", e);
        },
        fireReceiveSavedAuth: function (e) {
          return o.a.fire("receiveSavedAuth", e);
        },
        fireRequestRemoteSynchronization: function (e) {
          return o.a.fire("hubpress:request-remote-synchronization", e);
        },
        fireReceiveRemoteSynchronization: function (e) {
          return o.a.fire("hubpress:receive-remote-synchronization", e);
        },
        fireRequestRenderingDocuments: function (e) {
          return o.a.fire("hubpress:request-rendering-documents", e);
        },
        fireReceiveRenderingDocuments: function (e) {
          return o.a.fire("hubpress:receive-rendering-documents", e);
        },
        fireRequestRenderingPost: function (e) {
          return o.a.fire("requestRenderingPost", e);
        },
        fireReceiveRenderingPost: function (e) {
          return o.a.fire("receiveRenderingPost", e);
        },
        fireRequestLocalSynchronization: function (e) {
          return o.a.fire("hubpress:request-local-synchronization", e);
        },
        fireReceiveLocalSynchronization: function (e) {
          return o.a.fire("hubpress:receive-local-synchronization", e);
        },
        fireRequestLocalPosts: function (e) {
          return o.a.fire("hubpress:request-local-posts", e);
        },
        fireReceiveLocalPosts: function (e) {
          return o.a.fire("hubpress:receive-local-posts", e);
        },
        fireRequestLocalPost: function (e) {
          return o.a.fire("hubpress:request-local-post", e);
        },
        fireReceiveLocalPost: function (e) {
          return o.a.fire("hubpress:receive-local-post", e);
        },
        fireRequestDeleteLocalPost: function (e) {
          return o.a.fire("requestDeleteLocalPost", e);
        },
        fireReceiveDeleteLocalPost: function (e) {
          return o.a.fire("receiveDeleteLocalPost", e);
        },
        fireRequestSaveLocalPost: function (e) {
          return o.a.fire("requestSaveLocalPost", e);
        },
        fireReceiveSaveLocalPost: function (e) {
          return o.a.fire("receiveSaveLocalPost", e);
        },
        fireRequestSaveRemotePost: function (e) {
          return o.a.fire("requestSaveRemotePost", e);
        },
        fireReceiveSaveRemotePost: function (e) {
          return o.a.fire("receiveSaveRemotePost", e);
        },
        fireRequestPublishPost: function (e) {
          return o.a.fire("requestPublishPost", e);
        },
        fireReceivePublishPost: function (e) {
          return o.a.fire("receivePublishPost", e);
        },
        fireRequestLocalPublishedPosts: function (e) {
          return o.a.fire("requestLocalPublishedPosts", e);
        },
        fireReceiveLocalPublishedPosts: function (e) {
          return o.a.fire("receiveLocalPublishedPosts", e);
        },
        fireRequestLocalPublishedPages: function (e) {
          return o.a.fire("requestLocalPublishedPages", e);
        },
        fireReceiveLocalPublishedPages: function (e) {
          return o.a.fire("receiveLocalPublishedPages", e);
        },
        fireRequestSelectedPost: function (e) {
          return o.a.fire("requestSelectedPost", e);
        },
        fireReceiveSelectedPost: function (e) {
          return o.a.fire("receiveSelectedPost", e);
        },
        fireRequestAuthentication: function (e) {
          return o.a.fire("requestAuthentication", e);
        },
        fireReceiveAuthentication: function (e) {
          return e.nextState.twoFactorRequired
            ? payload
            : o.a.fire("receiveAuthentication", e);
        },
        fireRequestLogout: function (e) {
          return o.a.fire("requestLogout", e);
        },
        fireReceiveLogout: function (e) {
          return o.a.fire("receiveLogout", e);
        },
        fireRequestGenerateIndex: function (e) {
          return o.a.fire("requestGenerateIndex", e);
        },
        fireReceiveGenerateIndex: function (e) {
          return o.a.fire("receiveGenerateIndex", e);
        },
        fireRequestGeneratePost: function (e) {
          return o.a.fire("requestGeneratePost", e);
        },
        fireReceiveGeneratePost: function (e) {
          return o.a.fire("receiveGeneratePost", e);
        },
        fireRequestGeneratePosts: function (e) {
          return o.a.fire("requestGeneratePosts", e);
        },
        fireReceiveGeneratePosts: function (e) {
          return o.a.fire("receiveGeneratePosts", e);
        },
        fireRequestGenerateTags: function (e) {
          return o.a.fire("requestGenerateTags", e);
        },
        fireReceiveGenerateTags: function (e) {
          return o.a.fire("receiveGenerateTags", e);
        },
        fireRequestGenerateAuthors: function (e) {
          return o.a.fire("requestGenerateAuthors", e);
        },
        fireReceiveGenerateAuthors: function (e) {
          return o.a.fire("receiveGenerateAuthors", e);
        },
        fireRequestGeneratePages: function (e) {
          return o.a.fire("requestGeneratePages", e);
        },
        fireReceiveGeneratePages: function (e) {
          return o.a.fire("receiveGeneratePages", e);
        },
        fireRequestSaveRemotePublishedElements: function (e) {
          return o.a.fire("requestSaveRemotePublishedElements", e);
        },
        fireReceiveSaveRemotePublishedElements: function (e) {
          return o.a.fire("receiveSaveRemotePublishedElements", e);
        },
        fireRequestDeleteRemotePublishedPost: function (e) {
          return o.a.fire("requestDeleteRemotePublishedPost", e);
        },
        fireReceiveDeleteRemotePublishedPost: function (e) {
          return o.a.fire("receiveDeleteRemotePublishedPost", e);
        },
        fireRequestDeleteRemotePost: function (e) {
          return o.a.fire("requestDeleteRemotePost", e);
        },
        fireReceiveDeleteRemotePost: function (e) {
          return o.a.fire("receiveDeleteRemotePost", e);
        },
      };
    },
    "6hdJ": function (e, t, n) {
      "use strict";
      var i = n("X5n4");
      t.a = function (e) {
        var t = e.store,
          n = e.app;
        console.log("3000 ", n.router.routes), t.commit(i.e, n.router.routes);
      };
    },
    "6yLl": function (e, t, n) {
      "use strict";
      var i = n("Dd8w"),
        o = n.n(i),
        r = n("NYxO"),
        a = n("Pm0L");
      t.a = {
        name: "login",
        beforeMount: function () {
          this.requireInitilisation &&
            this.$store.state.application.config &&
            this.$store.state.application.config
              .initialisationConfigComponent &&
            (this.$options.components["initialisation-component"] =
              this.$store.state.application.config.initialisationConfigComponent);
        },
        computed: o()(
          {},
          Object(r.mapState)({
            email: function (e) {
              return e.authentication.credentials.email;
            },
            password: function (e) {
              return e.authentication.credentials.password;
            },
            twoFactorCode: function (e) {
              return e.authentication.credentials.twoFactorCode;
            },
            isTwoFactorCodeRequired: function (e) {
              return e.authentication.isTwoFactorCodeRequired;
            },
            requireInitilisation: function (e) {
              return e.application.requireInitilisation;
            },
          })
        ),
        methods: {
          updateEmail: function (e) {
            this.$store.commit(a.f, e.target.value);
          },
          updatePassword: function (e) {
            this.$store.commit(a.g, e.target.value);
          },
          updateTwoFactorCode: function (e) {
            this.$store.commit(a.h, e.target.value);
          },
          login: function () {
            this.$store.dispatch(a.e, this.$router);
          },
        },
      };
    },
    "7Fxy": function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "posts-container" }, [
            n("div", { staticClass: "ui fixed inverted menu" }, [
              n("div", { staticClass: "right menu" }, [
                n(
                  "div",
                  { staticClass: "ui right aligned category search item" },
                  [
                    n(
                      "div",
                      { staticClass: "ui transparent icon input inverted" },
                      [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: e.filterValue,
                              expression: "filterValue",
                            },
                          ],
                          attrs: {
                            type: "text",
                            placeholder: "Filter by title or tag...",
                          },
                          domProps: { value: e.filterValue },
                          on: {
                            input: function (t) {
                              t.target.composing ||
                                (e.filterValue = t.target.value);
                            },
                          },
                        }),
                        n("i", { staticClass: "filter link icon" }),
                      ]
                    ),
                    n("div", { staticClass: "results" }),
                  ]
                ),
                n(
                  "a",
                  {
                    staticClass: "item",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          e.synchronize();
                      },
                    },
                  },
                  [e._m(0)]
                ),
                n(
                  "a",
                  {
                    staticClass: "item",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(), t.preventDefault(), e.newPost();
                      },
                    },
                  },
                  [e._m(1)]
                ),
              ]),
            ]),
            n("div", { staticClass: "ui basic modal" }, [
              n("div", { staticClass: "ui icon header" }, [
                n("i", { staticClass: "trash icon" }),
                e._v(
                  ' Delete the post "' +
                    e._s(e.postToDelete.title) +
                    '"\n        '
                ),
              ]),
              e._m(2),
              e._m(3),
            ]),
            n("div", { staticClass: "posts ui container centered" }, [
              n("h2", { staticClass: "ui center aligned icon header" }, [
                n("i", { staticClass: "circular unordered list icon" }),
                e._v(
                  "\n        " + e._s(e.posts.length) + " post(s)\n        "
                ),
                e.filterValue.trim().length
                  ? n("span", {}, [
                      e._v("\n          filtered by "),
                      n("span", { staticClass: "ui tiny header orange" }, [
                        e._v(e._s(e.filterValue)),
                      ]),
                    ])
                  : e._e(),
              ]),
              n("div", { staticClass: "ui divider" }),
              n(
                "div",
                { staticClass: "ui cards centered aligned" },
                e._l(e.posts, function (t) {
                  return n(
                    "div",
                    {
                      key: t.id,
                      staticClass: "ui card",
                      class: e.getPostStatusColor(t),
                    },
                    [
                      n("div", { staticClass: "content" }, [
                        n("div", { staticClass: "header" }, [
                          e._v(e._s(t.title)),
                        ]),
                        n("div", { staticClass: "meta" }, [
                          n("span", { staticClass: "right floated time" }, [
                            e._v(e._s(e.publishedAt(t))),
                          ]),
                          n("span", { staticClass: "status" }, [
                            e._v(e._s(e.type(t)) + " - " + e._s(e.status(t))),
                          ]),
                        ]),
                      ]),
                      n("div", { staticClass: "image cover" }, [
                        n("div", {
                          style:
                            "background-image: url('" +
                            e.postCoverUrl(t) +
                            "')",
                        }),
                      ]),
                      n("div", { staticClass: "extra content" }, [
                        n("i", {
                          staticClass: "right floated large edit link icon",
                          on: {
                            click: function (n) {
                              e.navigateToPost(t);
                            },
                          },
                        }),
                        n("i", {
                          staticClass: "right floated large trash link icon",
                          on: {
                            click: function (n) {
                              e.displayConfirmMessage(t);
                            },
                          },
                        }),
                        n("div", { staticClass: "author" }, [
                          n("img", {
                            staticClass: "ui avatar image",
                            attrs: { src: e.getPostAuthor(t).avatar_url },
                          }),
                          e._v(
                            " " +
                              e._s(
                                e.getPostAuthor(t).name ||
                                  e.getPostAuthor(t).login
                              ) +
                              "\n                    "
                          ),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "extra content" },
                        [
                          e._l(t.tags, function (t) {
                            return n(
                              "a",
                              { key: t, staticClass: "ui tiny label" },
                              [
                                n("i", { staticClass: "tag icon" }),
                                e._v(" " + e._s(t) + "\n                    "),
                              ]
                            );
                          }),
                          t.tags && t.tags.length
                            ? e._e()
                            : n("div", {}, [
                                e._v(
                                  "\n                        No tag\n                    "
                                ),
                              ]),
                        ],
                        2
                      ),
                    ]
                  );
                })
              ),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t(
              "div",
              {
                staticClass: "ui icon",
                attrs: {
                  "data-tooltip": "Synchronize content",
                  "data-position": "bottom right",
                },
              },
              [t("i", { staticClass: "refresh large icon" })]
            );
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t(
              "div",
              {
                staticClass: "ui icon",
                attrs: {
                  "data-tooltip": "Create a post",
                  "data-position": "bottom right",
                },
              },
              [t("i", { staticClass: "add large icon" })]
            );
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "content" }, [
              t("p", [this._v("Are you sure you want to delete this post?")]),
            ]);
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "actions" }, [
              t("div", { staticClass: "ui red basic cancel inverted button" }, [
                t("i", { staticClass: "remove icon" }),
                this._v(" No\n            "),
              ]),
              t("div", { staticClass: "ui green ok inverted button" }, [
                t("i", { staticClass: "checkmark icon" }),
                this._v(" Yes\n            "),
              ]),
            ]);
          },
        ],
      };
      t.a = i;
    },
    "7cn8": function (e, t, n) {
      "use strict";
      var i = n("LEOq");
      n.n(i);
    },
    "7og9": function (e, t, n) {
      "use strict";
      (function (e) {
        n("Q7NK"), n("dCDI");
        var i = n("NpFX"),
          o = n("lYDI"),
          r = n("7Xsf"),
          a = (n.n(r), n("4/hK"));
        n.n(a);
        t.a = {
          name: "posts",
          data: function () {
            return {
              content: void 0,
              timeout: void 0,
              isDark: !0,
              isPreviewVisible: !1,
              isIFrame: !1,
              isFullScreen: !1,
              editorOption: {
                tabSize: 4,
                mode: "asciidoc",
                theme: "zenburn",
                lineNumbers: !1,
                line: !0,
                lineWrapping: !0,
                fixedGutter: !0,
                keyMap: "sublime",
                extraKeys: { Ctrl: "autocomplete" },
                foldGutter: !0,
                gutters: ["CodeMirror-linenumbers"],
                styleSelectedText: !0,
                highlightSelectionMatches: {
                  showToken: /\w/,
                  annotateScrollbar: !0,
                },
              },
            };
          },
          methods: {
            contentChange: function (e) {
              var t = this;
              if (this.post.content !== e) {
                var n = this.$store.state.application.config.meta.delay
                  ? this.$store.state.application.config.meta.delay
                  : 200;
                this.timeout && window.clearTimeout(this.timeout),
                  (this.timeout = window.setTimeout(function () {
                    t.$store.dispatch(o.c, { _id: t.post._id, content: e });
                  }, n || 200));
              }
            },
            showAsciidocHelp: function () {
              e("#asciidoc-help").modal("show");
            },
            switchLight: function () {
              (this.isDark = !this.isDark),
                this.$refs.codeEditor.codemirror.setOption(
                  "theme",
                  this.isDark ? "zenburn" : "base16-light"
                );
            },
            switchPreview: function (e) {
              this.isPreviewVisible
                ? this.isIFrame !== e
                  ? ((this.isIFrame = e),
                    e &&
                      this.$store.dispatch(o.c, {
                        _id: this.post._id,
                        content: this.post.content,
                      }))
                  : ((this.isIFrame = !1),
                    (this.isFullScreen = !1),
                    (this.isPreviewVisible = !this.isPreviewVisible))
                : (e &&
                    this.$store.dispatch(o.c, {
                      _id: this.post._id,
                      content: this.post.content,
                    }),
                  (this.isIFrame = e),
                  (this.isPreviewVisible = !this.isPreviewVisible),
                  (this.isFullScreen = !1));
            },
            switchPreviewSize: function () {
              this.isFullScreen = !this.isFullScreen;
            },
            remoteSave: function () {
              this.post.published
                ? this.$store.dispatch(o.f, this.post._id)
                : this.$store.dispatch(o.g, this.post._id);
            },
            publish: function () {
              this.post.published
                ? this.$store.dispatch(o.h, this.post._id)
                : this.$store.dispatch(o.f, this.post._id);
            },
            unpublish: function () {
              this.$store.dispatch(o.h, this.post._id);
            },
          },
          beforeMount: function () {
            this.$store.dispatch(o.e, this.$route.params.id);
          },
          mounted: function () {
            e(".ui.dropdown.item.themes").dropdown(),
              e("#asciidoc-help").modal({ closable: !0 });
          },
          beforeUpdate: function () {
            (this.content && this.content === this.post.content) ||
              (this.content = this.post.content);
          },
          computed: {
            id: function () {
              return this.$route.params.id;
            },
            post: function () {
              return this.$store.state.hubpress.post;
            },
            previewLabel: function () {
              return this.isPreviewVisible
                ? "Hide fast preview"
                : "Show fast preview";
            },
            previewLabelIFrame: function () {
              return this.isPreviewVisible
                ? "Hide real preview"
                : "Show real preview";
            },
            lightLabel: function () {
              return this.isDark ? "Light mode" : "Dark mode";
            },
            publishLabel: function () {
              return this.$store.state.hubpress.post.published
                ? "Unpublish post"
                : "Publish post";
            },
            isRemoteActionVisible: function () {
              return !!this.$store.state.hubpress.post.title;
            },
            isPostPublished: function () {
              return !!this.post.published;
            },
          },
          beforeCreate: function () {},
          created: function () {},
          components: { Preview: i.a },
        };
      }.call(t, n("7t+N")));
    },
    "90+m": function (e, t, n) {
      "use strict";
      t.a = {
        name: "hubpress-settings",
        computed: {
          meta: function () {
            return this.$store.state.application.config.meta || {};
          },
          site: function () {
            return this.$store.state.application.config.site || {};
          },
          theme: function () {
            return this.$store.state.application.config.theme || {};
          },
        },
      };
    },
    APUd: function (e, t, n) {
      "use strict";
      var i = n("Zrlr"),
        o = n.n(i),
        r = n("wxAW"),
        a = n.n(r),
        s = n("M4fF"),
        c = n.n(s),
        u = n("j+6P"),
        l = n.n(u),
        p = n("n+xr"),
        d = n.n(p),
        f = (function () {
          function e() {
            o()(this, e);
          }
          return (
            a()(e, [
              {
                key: "generate",
                value: function (e) {
                  console.info("PaginationGenerator - generate"),
                    console.log("PaginationGenerator - generate", e);
                  var t = e.posts,
                    n = e.opts.rootState.application.config,
                    i = n.site || {};
                  i.url = n.urls.site;
                  var o = 1,
                    r = (e.path || "") + "index.html",
                    a = [],
                    s = [],
                    u = parseInt(i.postsPerPage || 10, 10),
                    p =
                      (e.opts.nextState.theme.name,
                      e.opts.nextState.version,
                      n.urls.theme,
                      n.urls,
                      n.socialnetwork);
                  if (!t || !t.length) {
                    var f = l.a.template(
                      e.template,
                      {
                        pagination: {
                          prev: 0,
                          next: 0,
                          page: 0,
                          pages: 0,
                          total: 0,
                          limit: u,
                        },
                        posts: [],
                        tag: e.tag,
                        author: e.author,
                        socialnetwork: p,
                        title: i.title,
                        relativeUrl: "",
                      },
                      { config: n, theme: e.opts.nextState.theme }
                    );
                    return (
                      s.push({
                        name: "page-" + o,
                        path: r,
                        content: f,
                        message: "Publish page-" + o + " " + e.template,
                      }),
                      (e.opts.nextState.elementsToPublish = (
                        e.opts.nextState.elementsToPublish || []
                      ).concat(s)),
                      e.opts
                    );
                  }
                  var h = Math.ceil(t.length / u);
                  return (
                    c.a.each(t, function (f, g) {
                      var m = 0,
                        v = 0;
                      o > 1 &&
                        (r = (e.path || "") + "page/" + o + "/index.html"),
                        o > 1 && (v = o - 1),
                        o < h && (m = o + 1);
                      var b = void 0,
                        x = void 0;
                      f.tags &&
                        (x =
                          (b = c.a.map(f.tags, function (e) {
                            return { name: e, slug: d()(e), description: null };
                          })).length && b[0]);
                      var C = {
                        id: f.author.id,
                        name: f.author.name || f.author.login,
                        location: f.author.location,
                        website: f.author.blog,
                        image: f.author.avatar_url,
                        profile_image: f.author.avatar_url,
                        slug: f.author.login,
                      };
                      if (
                        (a.push({
                          image: f.image,
                          feature_image: f.image,
                          primary_tag: x,
                          title: f.title,
                          url: i.url + f.url,
                          excerpt: f.excerpt,
                          html: f.excerpt,
                          tags: b,
                          published_at: f.published_at,
                          relativeUrl: i.url + f.url,
                          authors: [C],
                          author: C,
                        }),
                        Math.floor((g + 1) / u) > o - 1 || g + 1 === t.length)
                      ) {
                        var y = l.a.template(
                          e.template,
                          {
                            pagination: {
                              prev: v,
                              next: m,
                              page: o,
                              pages: h,
                              total: t.length,
                              limit: u,
                            },
                            context:
                              "index" === e.template && 0 === v
                                ? "home"
                                : e.template,
                            posts: a,
                            tag: e.tag,
                            author: e.author,
                            title: i.title,
                            description: i.description,
                            socialnetwork: p,
                            relativeUrl: "",
                          },
                          { config: n, theme: e.opts.nextState.theme }
                        );
                        s.push({
                          name: "page-" + o,
                          path: r,
                          content: y,
                          message: "Publish page-" + o + " " + e.template,
                        }),
                          (a = []),
                          o++;
                      }
                    }),
                    (e.opts.nextState.elementsToPublish = (
                      e.opts.nextState.elementsToPublish || []
                    ).concat(s)),
                    e.opts
                  );
                },
              },
            ]),
            e
          );
        })();
      t.a = new f();
    },
    BJG1: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "post-container" }, [
            n("div", { staticClass: "ui fixed inverted menu" }, [
              n("div", { staticClass: "right menu" }, [
                n(
                  "a",
                  {
                    staticClass: "item",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          e.showAsciidocHelp();
                      },
                    },
                  },
                  [e._m(0)]
                ),
                n(
                  "a",
                  {
                    staticClass: "item",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          e.switchLight();
                      },
                    },
                  },
                  [
                    n(
                      "div",
                      {
                        staticClass: "ui icon",
                        attrs: {
                          "data-tooltip": e.lightLabel,
                          "data-position": "bottom right",
                        },
                      },
                      [
                        n("i", {
                          staticClass: "large icon",
                          class: { sun: e.isDark, moon: !e.isDark },
                        }),
                      ]
                    ),
                  ]
                ),
                n(
                  "a",
                  {
                    staticClass: "item html-preview",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          e.switchPreview(!1);
                      },
                    },
                  },
                  [
                    n(
                      "div",
                      {
                        staticClass: "ui icon",
                        attrs: {
                          "data-tooltip": e.previewLabel,
                          "data-position": "bottom right",
                        },
                      },
                      [
                        n("i", {
                          staticClass: "large icon",
                          class: {
                            unhide: !e.isPreviewVisible || e.isIFrame,
                            hide: e.isPreviewVisible && !e.isIFrame,
                          },
                        }),
                      ]
                    ),
                  ]
                ),
                n(
                  "a",
                  {
                    staticClass: "item",
                    attrs: { href: "#" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          e.switchPreview(!0);
                      },
                    },
                  },
                  [
                    n(
                      "div",
                      {
                        staticClass: "ui icon",
                        attrs: {
                          "data-tooltip": e.previewLabelIFrame,
                          "data-position": "bottom right",
                        },
                      },
                      [n("i", { staticClass: "large icon globe" })]
                    ),
                  ]
                ),
                e.isPreviewVisible
                  ? n(
                      "a",
                      {
                        staticClass: "item preview-resize",
                        attrs: { href: "#" },
                        on: {
                          click: function (t) {
                            t.stopPropagation(),
                              t.preventDefault(),
                              e.switchPreviewSize();
                          },
                        },
                      },
                      [
                        n(
                          "div",
                          {
                            staticClass: "ui icon",
                            attrs: {
                              "data-tooltip": e.resizeLabel,
                              "data-position": "bottom right",
                            },
                          },
                          [
                            n("i", {
                              staticClass: "large icon",
                              class: {
                                expand: !e.isFullScreen,
                                compress: e.isFullScreen,
                              },
                            }),
                          ]
                        ),
                      ]
                    )
                  : e._e(),
                e.isRemoteActionVisible
                  ? n(
                      "a",
                      {
                        staticClass: "item",
                        attrs: { href: "#" },
                        on: {
                          click: function (t) {
                            t.stopPropagation(),
                              t.preventDefault(),
                              e.remoteSave();
                          },
                        },
                      },
                      [e._m(1)]
                    )
                  : e._e(),
                e.isRemoteActionVisible
                  ? n(
                      "a",
                      {
                        staticClass: "item",
                        attrs: { href: "#" },
                        on: {
                          click: function (t) {
                            t.stopPropagation(),
                              t.preventDefault(),
                              e.publish();
                          },
                        },
                      },
                      [
                        n(
                          "div",
                          {
                            staticClass: "ui icon",
                            attrs: {
                              "data-tooltip": e.publishLabel,
                              "data-position": "bottom right",
                            },
                          },
                          [
                            n("i", { staticClass: "icons" }, [
                              n("i", {
                                staticClass: "cloud large icon",
                                class: {
                                  download: e.isPostPublished,
                                  upload: !e.isPostPublished,
                                },
                              }),
                            ]),
                          ]
                        ),
                      ]
                    )
                  : e._e(),
              ]),
            ]),
            e._m(2),
            n("div", { staticClass: "post-editor" }, [
              n(
                "div",
                {
                  staticClass: "ui grid",
                  class: { dark: e.isDark, light: !e.isDark },
                },
                [
                  n("div", { staticClass: "row" }, [
                    n(
                      "div",
                      {
                        staticClass: "column",
                        class: {
                          "sixteen wide mobile height wide computer is-preview-visible":
                            e.isPreviewVisible,
                          "sixteen wide": !e.isPreviewVisible,
                          "is-hidden": e.isFullScreen,
                        },
                        attrs: { id: "asciidoc-content" },
                      },
                      [
                        n("codemirror", {
                          ref: "codeEditor",
                          staticClass: "container",
                          attrs: { code: e.content, options: e.editorOption },
                          on: { input: e.contentChange },
                        }),
                      ],
                      1
                    ),
                    e.isPreviewVisible
                      ? n(
                          "div",
                          {
                            staticClass: "column",
                            class: {
                              "sixteen wide mobile height wide computer is-preview-visible":
                                e.isPreviewVisible,
                              "is-iframe": e.isIFrame,
                              "is-fullscreen": e.isFullScreen,
                            },
                            attrs: { id: "asciidoc-preview" },
                          },
                          [
                            n("preview", {
                              attrs: { post: e.post, iframe: e.isIFrame },
                            }),
                          ],
                          1
                        )
                      : e._e(),
                  ]),
                ]
              ),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t(
              "div",
              {
                staticClass: "ui icon",
                attrs: {
                  "data-tooltip": "Need some help?",
                  "data-position": "bottom right",
                },
              },
              [t("i", { staticClass: "help large icon" })]
            );
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t(
              "div",
              {
                staticClass: "ui icon",
                attrs: {
                  "data-tooltip": "Save your post remotely",
                  "data-position": "bottom right",
                },
              },
              [t("i", { staticClass: "save large icon" })]
            );
          },
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n(
              "div",
              { staticClass: "ui modal", attrs: { id: "asciidoc-help" } },
              [
                n("i", { staticClass: "close icon" }),
                n("div", { staticClass: "header" }, [
                  e._v("\n      Asciidoc syntax help\n    "),
                ]),
                n("div", { staticClass: "content" }, [
                  n("table", { staticClass: "ui table" }, [
                    n("thead", [
                      n("tr", [
                        n("th", { staticClass: "heigth wide" }, [
                          e._v("Result"),
                        ]),
                        n("th", { staticClass: "heigth wide" }, [
                          e._v("Asciidoc"),
                        ]),
                      ]),
                    ]),
                    n("tbody", [
                      n("tr", [
                        n("td", [e._v("H1")]),
                        n("td", [e._v("= Title")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("H2")]),
                        n("td", [e._v("== Title")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("H3")]),
                        n("td", [e._v("=== Title")]),
                      ]),
                      n("tr", [
                        n("td", [n("strong", [e._v("Bold")])]),
                        n("td", [e._v("*content*")]),
                      ]),
                      n("tr", [
                        n("td", [n("i", [e._v("Emphasize")])]),
                        n("td", [e._v("_content_")]),
                      ]),
                      n("tr", [
                        n("td", [
                          n("a", { attrs: { href: "#" } }, [e._v("Link")]),
                        ]),
                        n("td", [e._v("http://asciidoctor.org[Asciidoctor]")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("Image Block")]),
                        n("td", [e._v("image::sunset.jpg[]")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("Image Inline")]),
                        n("td", [
                          e._v(
                            'Click image:icons/pause.png[title="Pause"] when you need a break.'
                          ),
                        ]),
                      ]),
                      n("tr", [
                        n("td", [e._v("Video")]),
                        n("td", [e._v("video::video_file.mp4[]")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("Unordered list")]),
                        n("td", [e._v("* item")]),
                      ]),
                      n("tr", [
                        n("td", [e._v("Ordered list")]),
                        n("td", [e._v(". item")]),
                      ]),
                      n("tr", [
                        n("td", [n("code", [e._v("Inline code")])]),
                        n("td", [e._v("`code`")]),
                      ]),
                    ]),
                  ]),
                  n("p", [
                    e._v(
                      "\n        More informations about the Asciidoc syntax here: "
                    ),
                    n(
                      "a",
                      {
                        attrs: {
                          href: "http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/",
                          target: "_blank",
                        },
                      },
                      [e._v("AsciiDoc Syntax Quick Reference")]
                    ),
                  ]),
                ]),
              ]
            );
          },
        ],
      };
      t.a = i;
    },
    BdWi: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        console.info("PagesGenerator - generate"),
          console.log("PagesGenerator - generate", e);
        var t = e;
        return (
          e.nextState.publishedPages.forEach(function (e) {
            t = Object(o.a)(t, e);
          }),
          t
        );
      };
      n("APUd");
      var i = n("j+6P"),
        o = (n.n(i), n("KgKs"));
    },
    E1SC: function (e, t, n) {
      "use strict";
      var i = n("SUis"),
        o = n("7Fxy");
      var r = function (e) {
          n("vKgl");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    EgsU: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".posts-container .menu{min-height:47px}.posts-container{height:100%;overflow:auto}.posts.ui.container{padding-top:60px}.image.cover>div{width:100%;height:200px;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}@media screen and (max-width:622px){.posts.ui.container .ui.card .image.cover{display:none}}",
        "",
      ]);
    },
    F6eF: function (e, t, n) {
      "use strict";
      var i = n("7t+N"),
        o = n.n(i);
      t.a = {
        name: "initialise-configuration",
        data: function () {
          return {
            username: "",
            repositoryName: "hubpress.io",
            branch: "master",
            cname: void 0,
          };
        },
        mounted: function () {
          o()("div.dropdown").dropdown();
        },
        computed: {
          isValid: function () {
            return (
              "" != this.username.trim() && "" != this.repositoryName.trim()
            );
          },
        },
        methods: {
          submit: function () {
            var e = {
              username: this.username,
              repositoryName: this.repositoryName,
              branch: this.branch,
              cname: this.cname,
            };
            this.$store.dispatch("application:save-startup-config", e);
          },
        },
      };
    },
    F88d: function (e, t, n) {
      "use strict";
      var i = n("yUYC"),
        o = n("cmzl");
      var r = function (e) {
          n("0xYM");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    FIB3: function (e, t, n) {
      "use strict";
      t.a = {
        name: "nuxt-error",
        props: ["error"],
        head: function () {
          return {
            title: this.message,
            meta: [
              {
                name: "viewport",
                content:
                  "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
              },
            ],
          };
        },
        computed: {
          statusCode: function () {
            return (this.error && this.error.statusCode) || 500;
          },
          message: function () {
            return this.error.message || "Error";
          },
        },
      };
    },
    FdPX: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this.$createElement,
            t = this._self._c || e;
          return t("div", { staticClass: "__nuxt-error-page" }, [
            t("div", { staticClass: "error" }, [
              t(
                "svg",
                {
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "90",
                    height: "90",
                    fill: "#DBE1EC",
                    viewBox: "0 0 48 48",
                  },
                },
                [
                  t("path", {
                    attrs: {
                      d: "M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z",
                    },
                  }),
                ]
              ),
              t("div", { staticClass: "title" }, [
                this._v(this._s(this.message)),
              ]),
              404 === this.statusCode
                ? t(
                    "p",
                    { staticClass: "description" },
                    [
                      t(
                        "nuxt-link",
                        { staticClass: "error-link", attrs: { to: "/" } },
                        [this._v("Back to the home page")]
                      ),
                    ],
                    1
                  )
                : this._e(),
              this._m(0),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "logo" }, [
              t(
                "a",
                {
                  attrs: {
                    href: "https://nuxtjs.org",
                    target: "_blank",
                    rel: "noopener",
                  },
                },
                [this._v("Nuxt.js")]
              ),
            ]);
          },
        ],
      };
      t.a = i;
    },
    FoP8: function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      function applyScript(hasChanged) {
        if (hasChanged) {
          for (
            var element = document.getElementById("html-content"),
              scripts = element.getElementsByTagName("script"),
              addedScripts = [],
              i = 0;
            i < scripts.length;
            i++
          )
            if (
              "" != scripts[i].src &&
              -1 === addedScripts.indexOf(scripts[i].src)
            ) {
              var tag = document.createElement("script");
              (tag.src = scripts[i].src),
                addedScripts.push(tag.src),
                document.getElementsByTagName("head")[0].appendChild(tag);
            } else eval(scripts[i].innerHTML);
          if (!window.MathJax) {
            var _tag = document.createElement("script");
            (_tag.src =
              "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"),
              document.getElementsByTagName("head")[0].appendChild(_tag);
          }
          window.MathJax && window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]),
            window.instgrm && window.instgrm.Embeds.process();
        }
      }
      __webpack_exports__.a = {
        name: "preview",
        props: ["post", "iframe"],
        mounted: function () {
          this.iframe ||
            applyScript(this.post.content && this.post.content.trim().length);
        },
        updated: function (e, t) {
          this.iframe || applyScript(!0);
        },
      };
    },
    FogY: function (e, t, n) {
      "use strict";
      var i = n("7og9"),
        o = n("BJG1");
      var r = function (e) {
          n("WVd9");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    GfDd: function (e, t) {
      function n(e) {
        throw new Error("Cannot find module '" + e + "'.");
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "GfDd");
    },
    H1PK: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("receiveAuthentication", function (e) {
          return (
            console.info("sessionStoragePlugin - receiveAuthentication"),
            console.log("sessionStoragePlugin - receiveAuthentication", e),
            e.nextState.isAuthenticated &&
              sessionStorage.setItem(
                e.rootState.application.config.meta.repositoryName +
                  "-authentication",
                a()({
                  credentials: { token: e.nextState.credentials.token },
                  permissions: e.nextState.permissions,
                  userInformations: e.nextState.userInformations,
                })
              ),
            e
          );
        }),
          e.on("requestSavedAuth", function (e) {
            console.info("sessionStoragePlugin - requestSavedAuth"),
              console.log("sessionStoragePlugin - requestSavedAuth", e);
            var t = void 0,
              n = sessionStorage.getItem(
                e.rootState.application.config.meta.repositoryName +
                  "-authentication"
              );
            return (
              n
                ? ((t = JSON.parse(n)).isAuthenticated = !0)
                : (t = {
                    credentials: {},
                    userInformations: {},
                    isAuthenticated: !1,
                  }),
              (e.nextState.authentication = o()(
                {},
                e.nextState.authentication,
                t
              )),
              e
            );
          }),
          e.on("requestLogout", function (e) {
            return (
              console.info("sessionStoragePlugin - requestLogout"),
              console.log("sessionStoragePlugin - requestLogout", e),
              sessionStorage.removeItem(
                e.rootState.application.config.meta.repositoryName +
                  "-authentication"
              ),
              e
            );
          });
      };
      var i = n("woOf"),
        o = n.n(i),
        r = n("mvHQ"),
        a = n.n(r);
    },
    H8Oa: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("application:stores", function (e) {
          var t, n;
          console.info("hubpressPlugin - application:stores"),
            console.log("hubpressPlugin - application:stores", e);
          var i = {
            state: { post: {}, posts: [], theme: {} },
            mutations:
              ((t = {}),
              c()(t, P, function (e, t) {
                console.log("hubpress-" + P, t), l.a.merge(e, t.hubpress);
              }),
              c()(t, k, function (e, t) {
                console.log("hubpress-" + k, t), l.a.merge(e, t);
              }),
              c()(t, p.a, function (e, t) {
                console.log(p.a, t), (e.posts = t.posts);
              }),
              c()(t, p.e, function (e, t) {
                t.post.content ||
                  (t.post.content =
                    "// = Your Blog title\n// See https://hubpress.gitbooks.io/hubpress-knowledgebase/content/ for information about the parameters.\n// :hp-image: /covers/cover.png\n// :published_at: 2019-01-31\n// :hp-tags: HubPress, Blog, Open_Source,\n// :hp-alt-title: My English Title\n"),
                  (e.post = t.post);
              }),
              c()(t, p.g, function (e, t) {
                console.log(p.g, t), l.a.merge(e, t);
              }),
              c()(t, p.f, function (e, t) {
                console.log(p.f, t), l.a.merge(e, t);
              }),
              c()(t, p.h, function (e, t) {
                console.log(p.h, t), l.a.merge(e, t);
              }),
              c()(t, p.b, function (e, t) {
                console.log(p.b, t), l.a.merge(e, t), (e.posts = t.posts);
              }),
              c()(t, p.c, function (e, t) {
                console.log("Content Changed", t), (e.post = t.post);
              }),
              c()(t, p.d, function (e, t) {
                console.log("Post deleted", t),
                  l.a.merge(e, t),
                  (e.posts = t.posts);
              }),
              t),
            actions:
              ((n = {}),
              c()(n, S, function (e) {
                e.dispatch;
                var t = e.commit,
                  n = e.rootState,
                  i = e.state,
                  o = {
                    rootState: l.a.cloneDeep(n),
                    currentState: l.a.cloneDeep(i),
                  };
                return d.a
                  .initialize(o)
                  .then(function (e) {
                    return t(k, e.nextState);
                  })
                  .then(function (e) {
                    return console.info(
                      "HubPress initialized and synchronized"
                    );
                  });
              }),
              c()(n, p.b, function (e) {
                var t = e.dispatch,
                  n = e.commit,
                  i = e.rootState,
                  o = e.state,
                  r = {
                    rootState: l.a.cloneDeep(i),
                    currentState: l.a.cloneDeep(o),
                  };
                return t("application:loading")
                  .then(function (e) {
                    return d.a.synchronize(r);
                  })
                  .then(function (e) {
                    return n(p.b, e.nextState);
                  })
                  .then(function (e) {
                    return t("application:loaded");
                  })
                  .then(function (e) {
                    return t("application:notify", {
                      icon: "refresh",
                      header: "Synchronization",
                      message:
                        "Your content has been synchronized with success.",
                      level: "success",
                    });
                  });
              }),
              c()(n, p.e, function (e, t) {
                e.dispatch;
                var n = e.commit,
                  i = e.rootState,
                  o = e.state;
                console.log(p.e, t);
                var r = {
                  rootState: l.a.cloneDeep(i),
                  currentState: l.a.cloneDeep(o),
                  nextState: l.a.cloneDeep(o),
                };
                return (
                  (r.nextState.post._id = t),
                  d.a.getLocalPost(r).then(function (e) {
                    return n(p.e, e.nextState);
                  })
                );
              }),
              c()(n, p.d, function (e, t) {
                var n = e.dispatch,
                  i = e.commit,
                  o = e.rootState,
                  r = e.state;
                console.log(p.d, t);
                var a = {
                  rootState: l.a.cloneDeep(o),
                  currentState: l.a.cloneDeep(r),
                  nextState: l.a.cloneDeep(r),
                };
                return (
                  (a.nextState.post = { _id: t }),
                  n("application:loading")
                    .then(function (e) {
                      return d.a.deletePost(a);
                    })
                    .then(function (e) {
                      return i(p.d, e.nextState);
                    })
                    .then(function (e) {
                      return n("application:loaded");
                    })
                    .then(function (e) {
                      return n("application:notify", {
                        icon: "trash",
                        header: "Post deleted",
                        message: "Your post has been deleted with success.",
                        level: "success",
                      });
                    })
                );
              }),
              c()(n, p.g, function (e, t) {
                var n = e.dispatch,
                  i = e.commit,
                  o = e.rootState,
                  r = e.state;
                console.log(p.g, t);
                var a = {
                  rootState: l.a.cloneDeep(o),
                  currentState: l.a.cloneDeep(r),
                };
                return n("application:loading")
                  .then(function (e) {
                    return d.a.remoteSavePost(a);
                  })
                  .then(function (e) {
                    return i(p.g, e.nextState);
                  })
                  .then(function (e) {
                    return n("application:loaded");
                  })
                  .then(function (e) {
                    return n("application:notify", {
                      icon: "save",
                      header: "Post saved",
                      message:
                        "Your post has been saved remotely with success.",
                      level: "success",
                    });
                  });
              }),
              c()(n, p.f, function (e, t) {
                var n = e.dispatch,
                  i = e.commit,
                  o = e.rootState,
                  r = e.state;
                console.log(p.f, t);
                var a = {
                  rootState: l.a.cloneDeep(o),
                  currentState: l.a.cloneDeep(r),
                };
                return n("application:loading")
                  .then(function (e) {
                    return d.a.publishPost(a);
                  })
                  .then(function (e) {
                    return i(p.f, e.nextState);
                  })
                  .then(function (e) {
                    return n("application:loaded");
                  })
                  .then(function (e) {
                    return n("application:notify", {
                      icon: "rocket",
                      header: "Post published",
                      message: "Your post has been published with success.",
                      level: "success",
                    });
                  });
              }),
              c()(n, p.h, function (e, t) {
                var n = e.dispatch,
                  i = e.commit,
                  o = e.rootState,
                  r = e.state,
                  a = {
                    rootState: l.a.cloneDeep(o),
                    currentState: l.a.cloneDeep(r),
                  };
                return n("application:loading")
                  .then(function (e) {
                    return d.a.unpublishPost(a);
                  })
                  .then(function (e) {
                    return i(p.h, e.nextState);
                  })
                  .then(function (e) {
                    return n("application:loaded");
                  })
                  .then(function (e) {
                    return n("application:notify", {
                      icon: "check circle",
                      header: "Post unpublished",
                      message: "Your post has been unpublished with success.",
                      level: "success",
                    });
                  });
              }),
              c()(n, p.a, function (e) {
                var t = e.dispatch,
                  n = e.commit,
                  i = e.rootState,
                  o = e.state;
                console.log(p.a);
                var r = {
                  rootState: l.a.cloneDeep(i),
                  currentState: l.a.cloneDeep(o),
                };
                return t("application:loading")
                  .then(function (e) {
                    return d.a.getLocalPosts(r);
                  })
                  .then(function (e) {
                    return n(p.a, e.nextState);
                  })
                  .then(function (e) {
                    return t("application:loaded");
                  });
              }),
              c()(n, p.c, function (e, t) {
                e.dispatch;
                var n = e.commit,
                  i = e.rootState,
                  o = e.state,
                  r = {
                    rootState: l.a.cloneDeep(i),
                    currentState: l.a.cloneDeep(o),
                    payload: { post: t },
                  };
                return d.a.renderAndSavePost(r).then(function (e) {
                  n(p.c, e.nextState);
                });
              }),
              n),
            getters: {},
          };
          return (
            (e.nextState.stores.hubpress = i),
            console.log("hubpressPlugin - application:stores - return", e),
            e
          );
        }),
          e.on("application:routes", function (e) {
            return (
              console.info("hubpressPlugin - application:routes"),
              console.log("hubpressPlugin - application:routes", e),
              e.nextState.routes.push({
                id: "hubpress-blog",
                label: "Hubpress Blog",
                entries: [
                  { name: "about", path: "about", component: f.default },
                  {
                    label: "Content",
                    name: "content",
                    path: "content",
                    item: "Content",
                    component: g.a,
                  },
                  { name: "post", path: "posts/:id", component: h.a },
                ],
              }),
              console.log("hubpressPlugin - application:routes - return", e),
              e
            );
          }),
          e.on("application:initialize-plugins", function (e) {
            if (
              (console.info("hubpressPlugin - application:initialize-plugins"),
              console.log("hubpressPlugin - application:initialize-plugins", e),
              e.nextState.application.settingsTabs.push(
                { id: "hubpress", label: "HubPress", component: v.a },
                {
                  id: "hubpress-social",
                  label: "Social networks",
                  component: b.a,
                },
                { id: "navigation", label: "Navigation", component: m.a }
              ),
              !e.rootState.authentication.isAuthenticated)
            )
              return e;
            var t = a()({}, e, { nextState: e.nextState.hubpress });
            return d.a.initialize(t).then(function (t) {
              return (e.nextState.hubpress = t.nextState), e;
            });
          }),
          e.on("application:prepare-config", function (e) {
            console.info("hubpressPlugin - application:prepare-config"),
              console.log("hubpressPlugin - application:prepare-config", e),
              (e.nextState.config.site = e.nextState.config.site || {}),
              (e.nextState.config.site.title =
                e.payload.formData.get("hubpress-title")),
              (e.nextState.config.site.description = e.payload.formData.get(
                "hubpress-description"
              )),
              (e.nextState.config.site.logo =
                e.payload.formData.get("hubpress-logo")),
              (e.nextState.config.site.cover = e.payload.formData.get(
                "hubpress-cover-image"
              )),
              (e.nextState.config.site.delay = e.payload.formData.get(
                "hubpress-render-delay"
              )),
              (e.nextState.config.site.postsPerPage = e.payload.formData.get(
                "hubpress-posts-per-page"
              )),
              (e.nextState.config.site.googleAnalytics =
                e.payload.formData.get("hubpress-ga")),
              (e.nextState.config.site.disqus =
                e.payload.formData.get("hubpress-disqus")),
              (e.nextState.config.theme = e.nextState.config.theme || {}),
              (e.nextState.config.theme.name =
                e.payload.formData.get("hubpress-theme")),
              (e.nextState.config.socialnetwork =
                e.nextState.config.socialnetwork || {}),
              (e.nextState.config.socialnetwork.email =
                e.payload.formData.get("social-email")),
              (e.nextState.config.socialnetwork.github =
                e.payload.formData.get("social-github")),
              (e.nextState.config.socialnetwork.twitter =
                e.payload.formData.get("social-twitter")),
              (e.nextState.config.socialnetwork.facebook =
                e.payload.formData.get("social-facebook")),
              (e.nextState.config.socialnetwork.googleplus =
                e.payload.formData.get("social-googleplus")),
              (e.nextState.config.socialnetwork.instagram =
                e.payload.formData.get("social-instagram")),
              (e.nextState.config.socialnetwork.pinterest =
                e.payload.formData.get("social-pinterest")),
              (e.nextState.config.socialnetwork.flickr =
                e.payload.formData.get("social-flickr")),
              (e.nextState.config.socialnetwork.linkedin =
                e.payload.formData.get("social-linkedin")),
              (e.nextState.config.socialnetwork.stackoverflow =
                e.payload.formData.get("social-stackoverflow")),
              (e.nextState.config.navigation = []);
            var t = !0,
              n = !1,
              i = void 0;
            try {
              for (
                var r, a = o()(e.payload.formData.keys());
                !(t = (r = a.next()).done);
                t = !0
              ) {
                var s = r.value;
                if (s.startsWith("navigation-label-")) {
                  var c = e.payload.formData.get(s),
                    u = s.split("navigation-label-")[1],
                    l = e.payload.formData.get("navigation-url-" + u);
                  e.nextState.config.navigation.push({ label: c, url: l });
                }
              }
            } catch (e) {
              (n = !0), (i = e);
            } finally {
              try {
                !t && a.return && a.return();
              } finally {
                if (n) throw i;
              }
            }
            return (
              console.log(
                "hubpressPlugin - application:prepare-config - return",
                e
              ),
              e
            );
          }),
          e.on("application:save-config-done", function (e) {
            console.info("hubpressPlugin - application:save-config-done"),
              console.log("hubpressPlugin - application:save-config-done", e);
            var t = a()({}, e, { nextState: e.nextState.hubpress });
            return d.a.refreshAfterSavedConfig(t).then(function (t) {
              return (e.nextState.hubpress = t.nextState), e;
            });
          });
      };
      var i = n("BO1k"),
        o = n.n(i),
        r = n("woOf"),
        a = n.n(r),
        s = n("bOdI"),
        c = n.n(s),
        u = n("M4fF"),
        l = n.n(u),
        p = n("lYDI"),
        d = n("0rCp"),
        f = n("gFkU"),
        h = n("FogY"),
        g = n("E1SC"),
        m = n("/NKE"),
        v = n("lWwS"),
        b = n("Tknw"),
        x = n("I3G/"),
        C = n.n(x),
        y = n("E5Az"),
        w = n.n(y);
      C.a.use(w.a);
      var P = "application:initialize-plugins",
        k = "hubpress:initialize",
        S = "authorisation:authentication-done";
    },
    "HBB+": function (e, t, n) {
      "use strict";
      t.a = {
        name: "nuxt-child",
        functional: !0,
        props: ["keepAlive"],
        render: function (e, t) {
          var n = t.parent,
            r = t.data,
            a = t.props;
          r.nuxtChild = !0;
          for (
            var s = n,
              c = n.$nuxt.nuxt.transitions,
              u = n.$nuxt.nuxt.defaultTransition,
              l = 0;
            n;

          )
            n.$vnode && n.$vnode.data.nuxtChild && l++, (n = n.$parent);
          r.nuxtChildDepth = l;
          var p = c[l] || u,
            d = {};
          i.forEach(function (e) {
            void 0 !== p[e] && (d[e] = p[e]);
          });
          var f = {};
          o.forEach(function (e) {
            "function" == typeof p[e] && (f[e] = p[e].bind(s));
          });
          var h = f.beforeEnter;
          f.beforeEnter = function (e) {
            if ((window.$nuxt.$emit("triggerScroll"), h)) return h.call(s, e);
          };
          var g = [e("router-view", r)];
          return (
            void 0 !== a.keepAlive && (g = [e("keep-alive", g)]),
            e("transition", { props: d, on: f }, g)
          );
        },
      };
      var i = [
          "name",
          "mode",
          "appear",
          "css",
          "type",
          "duration",
          "enterClass",
          "leaveClass",
          "appearClass",
          "enterActiveClass",
          "enterActiveClass",
          "leaveActiveClass",
          "appearActiveClass",
          "enterToClass",
          "leaveToClass",
          "appearToClass",
        ],
        o = [
          "beforeEnter",
          "enter",
          "afterEnter",
          "enterCancelled",
          "beforeLeave",
          "leave",
          "afterLeave",
          "leaveCancelled",
          "beforeAppear",
          "appear",
          "afterAppear",
          "appearCancelled",
        ];
    },
    HEYa: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".navigation-container>.menu[data-v-0536f20d]{height:47px}",
        "",
      ]);
    },
    HUXV: function (e, t, n) {
      "use strict";
      var i = n("6Ndi");
      t.a = {
        refreshAfterSavedConfig: function (e) {
          return i.a
            .fireRequestTheme(e)
            .then(function (t) {
              return i.a.fireReceiveTheme(e);
            })
            .then(function (e) {
              return i.a.fireRequestLocalPublishedPosts(e);
            })
            .then(function (e) {
              return i.a.fireReceiveLocalPublishedPosts(e);
            })
            .then(function (e) {
              return console.time("Build content"), e;
            })
            .then(function (e) {
              return i.a.fireRequestGenerateIndex(e);
            })
            .then(function (e) {
              return i.a.fireReceiveGenerateIndex(e);
            })
            .then(function (e) {
              return i.a.fireRequestGeneratePosts(e);
            })
            .then(function (e) {
              return i.a.fireReceiveGeneratePosts(e);
            })
            .then(function (e) {
              return i.a.fireRequestGenerateTags(e);
            })
            .then(function (e) {
              return i.a.fireReceiveGenerateTags(e);
            })
            .then(function (e) {
              return i.a.fireRequestGenerateAuthors(e);
            })
            .then(function (e) {
              return i.a.fireReceiveGenerateAuthors(e);
            })
            .then(function (e) {
              return i.a.fireRequestLocalPublishedPages(e);
            })
            .then(function (e) {
              return i.a.fireReceiveLocalPublishedPages(e);
            })
            .then(function (e) {
              return i.a.fireRequestGeneratePages(e);
            })
            .then(function (e) {
              return i.a.fireReceiveGeneratePages(e);
            })
            .then(function (e) {
              return console.timeEnd("Build content"), e;
            })
            .then(function (e) {
              return i.a.fireRequestSaveRemotePublishedElements(e);
            })
            .then(function (e) {
              return i.a.fireReceiveSaveRemotePublishedElements(e);
            });
        },
      };
    },
    "Hot+": function (e, t, n) {
      "use strict";
      var i = n("I3G/"),
        o = n.n(i),
        r = n("HBB+"),
        a = n("ct3O"),
        s = n("YLfZ");
      t.a = {
        name: "nuxt",
        props: ["nuxtChildKey", "keepAlive"],
        render: function (e) {
          return this.nuxt.err
            ? e("nuxt-error", { props: { error: this.nuxt.err } })
            : e("nuxt-child", { key: this.routerViewKey, props: this.$props });
        },
        beforeCreate: function () {
          o.a.util.defineReactive(this, "nuxt", this.$root.$options.nuxt);
        },
        computed: {
          routerViewKey: function () {
            if (void 0 !== this.nuxtChildKey || this.$route.matched.length > 1)
              return (
                this.nuxtChildKey ||
                Object(s.b)(this.$route.matched[0].path)(this.$route.params)
              );
            var e =
              this.$route.matched[0] &&
              this.$route.matched[0].components.default;
            return e && e.options && e.options.key
              ? "function" == typeof e.options.key
                ? e.options.key(this.$route)
                : e.options.key
              : this.$route.path;
          },
        },
        components: { NuxtChild: r.a, NuxtError: a.a },
      };
    },
    IBrK: function (e, t, n) {
      "use strict";
      var i = n("F6eF"),
        o = n("N3Gg");
      var r = function (e) {
          n("XkEn");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    Ie2b: function (e, t) {},
    Irdm: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "settings-container" }, [
            n("div", { staticClass: "ui fixed inverted menu" }, [
              n("div", { staticClass: "right menu" }, [
                n(
                  "a",
                  {
                    staticClass: "item",
                    on: {
                      click: function (t) {
                        return (
                          t.stopPropagation(), t.preventDefault(), e.submit(t)
                        );
                      },
                    },
                  },
                  [e._m(0)]
                ),
              ]),
            ]),
            n("div", { staticClass: "ui container settings-content" }, [
              e._m(1),
              n("div", { staticClass: "ui divider" }),
              n(
                "form",
                { staticClass: "ui form", attrs: { id: "mainForm" } },
                [
                  n(
                    "div",
                    { staticClass: "ui secondary pointing menu" },
                    [
                      n(
                        "div",
                        {
                          staticClass: "item active",
                          attrs: {
                            "data-tab": "application",
                            id: "application-tab",
                          },
                        },
                        [e._v("Application")]
                      ),
                      e._l(e.tabs, function (t) {
                        return n(
                          "div",
                          {
                            key: t.id,
                            staticClass: "item",
                            attrs: { "data-tab": t.id },
                          },
                          [e._v(e._s(t.label))]
                        );
                      }),
                    ],
                    2
                  ),
                  n(
                    "div",
                    {
                      staticClass: "ui bottom attached tab segment active",
                      attrs: { "data-tab": "application" },
                    },
                    [
                      n("h4", { staticClass: "ui dividing header" }, [
                        e._v("Domain"),
                      ]),
                      n("div", { staticClass: "field" }, [
                        n("label", [e._v("CNAME")]),
                        n("input", {
                          attrs: {
                            type: "text",
                            name: "application-cname",
                            placeholder: "CNAME",
                          },
                          domProps: { value: e.config.meta.cname },
                        }),
                      ]),
                      n("h4", { staticClass: "ui dividing header" }, [
                        e._v("Metadata (set in config.json)"),
                      ]),
                      n("div", { staticClass: "disabled field" }, [
                        n("label", [e._v("GitHub username")]),
                        n("input", {
                          attrs: {
                            type: "text",
                            disabled: "",
                            name: "application-github-username",
                            placeholder: "Github username",
                          },
                          domProps: { value: e.config.meta.username },
                        }),
                      ]),
                      n("div", { staticClass: "disabled field" }, [
                        n("label", [e._v("GitHub repository name")]),
                        n("input", {
                          attrs: {
                            type: "text",
                            disabled: "",
                            name: "application-github-repository-name",
                            placeholder: "GitHub repository name",
                          },
                          domProps: { value: e.config.meta.repositoryName },
                        }),
                      ]),
                      n("div", { staticClass: "disabled field" }, [
                        n("label", [e._v("GitHub branch")]),
                        n("input", {
                          attrs: {
                            type: "text",
                            disabled: "",
                            name: "application-github-branch",
                            placeholder: "GitHub branch",
                          },
                          domProps: { value: e.config.meta.branch },
                        }),
                      ]),
                      e._m(2),
                    ]
                  ),
                  e._l(e.tabs, function (e) {
                    return n(
                      "div",
                      {
                        key: e.id,
                        staticClass: "ui bottom attached tab segment ",
                        attrs: { "data-tab": e.id },
                      },
                      [n(e.id, { tag: "component" })],
                      1
                    );
                  }),
                ],
                2
              ),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t(
              "div",
              {
                staticClass: "ui icon",
                attrs: {
                  "data-tooltip": "Save your settings",
                  "data-position": "bottom right",
                },
              },
              [t("i", { staticClass: "save large icon" })]
            );
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("h2", { staticClass: "ui center aligned icon header" }, [
              t("i", { staticClass: "circular settings icon" }),
              this._v("\n      Settings\n    "),
            ]);
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "disabled field" }, [
              t("label", [this._v("Blog URL")]),
              t("input", {
                attrs: {
                  type: "text",
                  disabled: "",
                  name: "application-blog-url",
                  placeholder: "Blog URL",
                },
              }),
            ]);
          },
        ],
      };
      t.a = i;
    },
    J2Ti: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return w;
      });
      var i = n("woOf"),
        o = n.n(i),
        r = n("BO1k"),
        a = n.n(r),
        s = n("I3G/"),
        c = n.n(s),
        u = n("NYxO");
      c.a.use(u.default);
      var l = n("1H2/"),
        p = l.keys(),
        d = {},
        f = void 0;
      if (
        (p.forEach(function (e) {
          -1 !== e.indexOf("./index.") && (f = e);
        }),
        f && (d = P(f)),
        "function" != typeof d)
      ) {
        d.modules || (d.modules = {});
        var h = !0,
          g = !1,
          m = void 0;
        try {
          for (var v, b = a()(p); !(h = (v = b.next()).done); h = !0) {
            var x = v.value,
              C = x.replace(/^\.\//, "").replace(/\.(js|ts)$/, "");
            if ("index" !== C) {
              var y = C.split(/\//);
              ((e = k(d, y))[(C = y.pop())] = P(x)), (e[C].namespaced = !0);
            }
          }
        } catch (e) {
          (g = !0), (m = e);
        } finally {
          try {
            !h && b.return && b.return();
          } finally {
            if (g) throw m;
          }
        }
      }
      var w =
        d instanceof Function
          ? d
          : function () {
              return new u.default.Store(
                o()({ strict: !1 }, d, {
                  state: d.state instanceof Function ? d.state() : {},
                })
              );
            };
      function P(e) {
        var t = l(e),
          n = t.default || t;
        if (n.commit)
          throw new Error(
            "[nuxt] store/" +
              e.replace("./", "") +
              " should export a method which returns a Vuex instance."
          );
        if (n.state && "function" != typeof n.state)
          throw new Error(
            "[nuxt] state should be a function in store/" + e.replace("./", "")
          );
        return n;
      }
      function k(e, t) {
        if (1 === t.length) return e.modules;
        var n = t.shift();
        return (
          (e.modules[n] = e.modules[n] || {}),
          (e.modules[n].namespaced = !0),
          (e.modules[n].modules = e.modules[n].modules || {}),
          k(e.modules[n], t)
        );
      }
    },
    JtYm: function (e, t, n) {
      "use strict";
      var i = n("6Ndi");
      function o(e) {
        return i.a.fireRequestLocalPosts(e).then(function (e) {
          return i.a.fireReceiveLocalPosts(e);
        });
      }
      t.a = {
        deletePost: function (e) {
          return i.a
            .fireRequestLocalPost(e)
            .then(function (e) {
              return i.a.fireReceiveLocalPost(e);
            })
            .then(function (e) {
              var t =
                (e.nextState.post.original && e.nextState.post.original.tags) ||
                [];
              return (e.nextState.tags = t), e;
            })
            .then(function (e) {
              return e.nextState.post.original
                ? i.a.fireRequestDeleteRemotePost(e).then(function (e) {
                    return i.a.fireReceiveDeleteRemotePost(e);
                  })
                : e;
            })
            .then(function (e) {
              return i.a.fireRequestDeleteLocalPost(e);
            })
            .then(function (e) {
              return i.a.fireReceiveDeleteLocalPost(e);
            })
            .then(function (e) {
              return e.nextState.post.published
                ? i.a
                    .fireRequestDeleteRemotePublishedPost(e)
                    .then(function (e) {
                      return i.a.fireReceiveDeleteRemotePublishedPost(e);
                    })
                    .then(function (e) {
                      return i.a.fireRequestLocalPublishedPosts(e);
                    })
                    .then(function (e) {
                      return i.a.fireReceiveLocalPublishedPosts(e);
                    })
                    .then(function (e) {
                      return i.a.fireRequestGenerateIndex(e);
                    })
                    .then(function (e) {
                      return i.a.fireReceiveGenerateIndex(e);
                    })
                    .then(function (e) {
                      return i.a.fireRequestGenerateTags(e);
                    })
                    .then(function (e) {
                      return i.a.fireReceiveGenerateTags(e);
                    })
                    .then(function (e) {
                      return i.a.fireRequestGenerateAuthors(e);
                    })
                    .then(function (e) {
                      return i.a.fireReceiveGenerateAuthors(e);
                    })
                    .then(function (e) {
                      return i.a.fireRequestSaveRemotePublishedElements(e);
                    })
                    .then(function (e) {
                      return i.a.fireReceiveSaveRemotePublishedElements(e);
                    })
                : e;
            })
            .then(o);
        },
        getLocalPost: function (e) {
          return i.a.fireRequestLocalPost(e).then(function (e) {
            return i.a.fireReceiveLocalPost(e);
          });
        },
        getLocalPosts: o,
        remoteSavePost: function (e) {
          return (
            (e.currentState.elementsToPublish = []),
            i.a
              .fireRequestLocalPost(e)
              .then(function (e) {
                return i.a.fireReceiveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireRequestSaveRemotePost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveRemotePost(e);
              })
              .then(function (e) {
                return i.a.fireRequestSaveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveLocalPost(e);
              })
          );
        },
        renderAndSavePost: function (e) {
          return i.a
            .fireRequestLocalPost(e)
            .then(function (e) {
              return i.a.fireReceiveLocalPost(e);
            })
            .then(function (e) {
              return (e.nextState.post.content = e.payload.post.content), e;
            })
            .then(function (e) {
              return i.a.fireRequestRenderingPost(e);
            })
            .then(function (e) {
              return i.a.fireReceiveRenderingPost(e);
            })
            .then(function (e) {
              return e.nextState.post && e.nextState.post.title
                ? i.a.fireRequestSaveLocalPost(e).then(function (e) {
                    return i.a.fireReceiveSaveLocalPost(e);
                  })
                : e;
            })
            .then(function (e) {
              var t = e.nextState.post.original;
              return (
                (e.nextState.post.original = e.nextState.post),
                i.a
                  .fireRequestGeneratePost(e)
                  .then(function (e) {
                    return i.a.fireReceiveGeneratePost(e);
                  })
                  .then(function (e) {
                    var n = e.nextState.elementsToPublish[0] || {};
                    return (
                      (e.nextState.post.publishedContent = n.content),
                      (e.nextState.post.original = t),
                      e
                    );
                  })
              );
            });
        },
        publishPost: function (e) {
          return (
            (e.currentState.elementsToPublish = []),
            i.a
              .fireRequestLocalPost(e)
              .then(function (e) {
                return i.a.fireReceiveLocalPost(e);
              })
              .then(function (e) {
                var t =
                  (e.nextState.post.original &&
                    e.nextState.post.original.tags) ||
                  [];
                return (
                  (e.nextState.tags = _.union(e.nextState.post.tags, t)), e
                );
              })
              .then(function (e) {
                return i.a.fireRequestSaveRemotePost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveRemotePost(e);
              })
              .then(function (e) {
                return (
                  (e.nextState.post.original.author =
                    e.nextState.post.original.author ||
                    e.nextState.post.author),
                  (e.nextState.post.published = 1),
                  e
                );
              })
              .then(function (e) {
                return i.a.fireRequestSaveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireRequestLocalPublishedPosts(e);
              })
              .then(function (e) {
                return i.a.fireReceiveLocalPublishedPosts(e);
              })
              .then(function (e) {
                return i.a.fireRequestGeneratePost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveGeneratePost(e);
              })
              .then(function (e) {
                return "post" !== e.nextState.post.type
                  ? e
                  : i.a
                      .fireRequestGenerateIndex(e)
                      .then(function (e) {
                        return i.a.fireReceiveGenerateIndex(e);
                      })
                      .then(function (e) {
                        return i.a.fireRequestGenerateTags(e);
                      })
                      .then(function (e) {
                        return i.a.fireReceiveGenerateTags(e);
                      })
                      .then(function (e) {
                        return i.a.fireRequestGenerateAuthors(e);
                      })
                      .then(function (e) {
                        return i.a.fireReceiveGenerateAuthors(e);
                      });
              })
              .then(function (e) {
                return i.a.fireRequestSaveRemotePublishedElements(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveRemotePublishedElements(e);
              })
          );
        },
        unpublishPost: function (e) {
          return (
            (e.currentState.elementsToPublish = []),
            i.a
              .fireRequestLocalPost(e)
              .then(function (e) {
                return i.a.fireReceiveLocalPost(e);
              })
              .then(function (e) {
                var t =
                  (e.nextState.post.original &&
                    e.nextState.post.original.tags) ||
                  [];
                return (e.nextState.tags = t), e;
              })
              .then(function (e) {
                return i.a.fireRequestDeleteRemotePublishedPost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveDeleteRemotePublishedPost(e);
              })
              .then(function (e) {
                return (e.nextState.post.published = 0), e;
              })
              .then(function (e) {
                return i.a.fireRequestSaveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveLocalPost(e);
              })
              .then(function (e) {
                return i.a.fireRequestLocalPublishedPosts(e);
              })
              .then(function (e) {
                return i.a.fireReceiveLocalPublishedPosts(e);
              })
              .then(function (e) {
                return "post" !== e.nextState.post.type
                  ? e
                  : i.a
                      .fireRequestGenerateIndex(e)
                      .then(function (e) {
                        return i.a.fireReceiveGenerateIndex(e);
                      })
                      .then(function (e) {
                        return i.a.fireRequestGenerateTags(e);
                      })
                      .then(function (e) {
                        return i.a.fireReceiveGenerateTags(e);
                      })
                      .then(function (e) {
                        return i.a.fireRequestGenerateAuthors(e);
                      })
                      .then(function (e) {
                        return i.a.fireReceiveGenerateAuthors(e);
                      });
              })
              .then(function (e) {
                return i.a.fireRequestSaveRemotePublishedElements(e);
              })
              .then(function (e) {
                return i.a.fireReceiveSaveRemotePublishedElements(e);
              })
          );
        },
      };
    },
    KMrN: function (e, t, n) {
      "use strict";
      var i = n("LEOq"),
        o = n.n(i);
      t.a = {
        authenticate: function (e) {
          return (function (e) {
            return o.a.fire("requestAuthentication", e);
          })(e).then(function (e) {
            return (t = e).nextState.twoFactorRequired
              ? payload
              : o.a.fire("receiveAuthentication", t);
            var t;
          });
        },
        initialize: function (e) {
          return (function (e) {
            return o.a.fire("requestSavedAuth", e);
          })(e).then(function (e) {
            return (t = e), o.a.fire("receiveSavedAuth", t);
            var t;
          });
        },
      };
    },
    KOTd: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        console.info("AuthorGenerator - generate"),
          console.log("AuthorGenerator - generate", e);
        var t = void 0;
        if (!s.a.isTemplateAvailable("author")) return e;
        t = e.nextState.author
          ? e.nextState.publishedPosts.filter(function (t) {
              return t.author.login === e.nextState.author.login;
            })
          : e.nextState.publishedPosts;
        var n = r.a.reduce(
            t,
            function (e, t) {
              return (
                (e[t.author.login] = e[t.author.login] || []),
                e[t.author.login].push(t),
                e
              );
            },
            {}
          ),
          o = e;
        return (
          r.a.each(n, function (e, t) {
            var n = e[0].author;
            (n.name = n.name || n.login),
              (n.slug = t),
              (n.website = n.blog),
              (n.status = ""),
              (o = i.a.generate({
                opts: o,
                posts: e,
                author: n,
                template: "author",
                path: "author/" + t + "/",
              }));
          }),
          o
        );
      };
      var i = n("APUd"),
        o = n("M4fF"),
        r = n.n(o),
        a = n("j+6P"),
        s = n.n(a),
        c = n("n+xr");
      n.n(c);
    },
    KgKs: function (e, t, n) {
      "use strict";
      t.a = function (e, t) {
        console.info("PostGenerator - generate"),
          console.log("PostGenerator - generate", e);
        var n = t,
          i = o()({}, n.original);
        i.tags = a.a.map(i.tags, function (e) {
          return { name: e, slug: l()(e) };
        });
        var r = i.author;
        i.author = {
          id: r.id,
          name: r.name || r.login,
          location: r.location,
          website: r.blog,
          image: r.avatar_url,
          profile_image: r.avatar_url,
          bio: r.bio,
          status: "",
          slug: r.login,
        };
        var s = e.rootState.application.config,
          u = s.urls;
        e.nextState.theme.name, e.nextState.theme.version, s.urls.theme;
        (i.urls = u), (i.status = "published"), (i.feature_image = i.image);
        var p = c.a.template(
            n.type || "post",
            {
              context: n.type || "post",
              socialnetwork: s.socialnetwork,
              relativeUrl: n.url,
              post: i,
              author: i.author,
            },
            { config: s, theme: e.nextState.theme }
          ),
          d = [];
        return (
          d.push({
            title: n.title,
            image: n.image,
            name: n.name,
            path: s.urls.getContentGhPath(n.name, n.type),
            url: s.urls.getContentGhPath(n.name, n.type),
            content: p,
            message: "Publish " + n.name,
            published_at: n.published_at,
          }),
          (e.nextState.elementsToPublish = (
            e.nextState.elementsToPublish || []
          ).concat(d)),
          e
        );
      };
      var i = n("woOf"),
        o = n.n(i),
        r = n("M4fF"),
        a = n.n(r),
        s = n("j+6P"),
        c = n.n(s),
        u = n("n+xr"),
        l = n.n(u);
    },
    LB67: function (e, t, n) {
      "use strict";
      var i = n("6Ndi");
      t.a = {
        authenticate: function (e) {
          return i.a.fireRequestAuthentication(e).then(function (e) {
            return i.a.fireReceiveAuthentication(e);
          });
        },
      };
    },
    LnjV: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([e.i, "", ""]);
    },
    MHN4: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".about-content{padding-top:60px}",
        "",
      ]);
    },
    Mha6: function (e, t, n) {
      var i = n("ys1n");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("4942fa76", i, !0, { sourceMap: !1 });
    },
    N3Gg: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "initialise-configuration" }, [
            e._m(0),
            n("div", { staticClass: "ui divider" }),
            n("div", { staticClass: "content" }, [
              e._v(
                "\n    We need to initialize your configuration before a first use.\n  "
              ),
            ]),
            n("div", { staticClass: "ui divider" }),
            n(
              "form",
              {
                staticClass: "ui form",
                attrs: { id: "configurationForm" },
                on: {
                  submit: function (t) {
                    t.preventDefault(), e.submit();
                  },
                },
              },
              [
                n("div", { staticClass: "required field" }, [
                  n("label", [e._v("Username")]),
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.username,
                        expression: "username",
                      },
                    ],
                    attrs: {
                      type: "text",
                      name: "configuration-username",
                      placeholder: "Your github username",
                    },
                    domProps: { value: e.username },
                    on: {
                      input: function (t) {
                        t.target.composing || (e.username = t.target.value);
                      },
                    },
                  }),
                ]),
                n("div", { staticClass: "required field" }, [
                  n("label", [e._v("Repository name")]),
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.repositoryName,
                        expression: "repositoryName",
                      },
                    ],
                    attrs: {
                      type: "text",
                      name: "configuration-cname",
                      placeholder: "The name of your repository",
                    },
                    domProps: { value: e.repositoryName },
                    on: {
                      input: function (t) {
                        t.target.composing ||
                          (e.repositoryName = t.target.value);
                      },
                    },
                  }),
                ]),
                n("div", { staticClass: "required field" }, [
                  n("label", [e._v("Branch")]),
                  n("div", { staticClass: "ui selection dropdown" }, [
                    n("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: e.branch,
                          expression: "branch",
                        },
                      ],
                      attrs: { type: "hidden", name: "branch" },
                      domProps: { value: e.branch },
                      on: {
                        input: function (t) {
                          t.target.composing || (e.branch = t.target.value);
                        },
                      },
                    }),
                    n("i", { staticClass: "dropdown icon" }),
                    n("div", { staticClass: "default text" }, [e._v("master")]),
                    e._m(1),
                  ]),
                ]),
                n("div", { staticClass: "field" }, [
                  n("label", [e._v("Domain name")]),
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.cname,
                        expression: "cname",
                      },
                    ],
                    attrs: {
                      type: "text",
                      name: "configuration-cname",
                      placeholder: "Your domain name if you have one",
                    },
                    domProps: { value: e.cname },
                    on: {
                      input: function (t) {
                        t.target.composing || (e.cname = t.target.value);
                      },
                    },
                  }),
                ]),
                n(
                  "button",
                  {
                    staticClass: "ui fluid large submit button",
                    attrs: {
                      type: "submit",
                      name: "button",
                      disabled: !e.isValid,
                    },
                  },
                  [e._v("Ok, let's go!")]
                ),
              ]
            ),
            e._m(2),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("h2", { staticClass: "ui center aligned icon header" }, [
              t("i", { staticClass: "circular configure icon" }),
              this._v("\n    Configuration\n  "),
            ]);
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "menu" }, [
              t(
                "div",
                { staticClass: "item", attrs: { "data-value": "master" } },
                [this._v("master")]
              ),
              t(
                "div",
                { staticClass: "item", attrs: { "data-value": "gh-pages" } },
                [this._v("gh-pages")]
              ),
            ]);
          },
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "ui message" }, [
              this._v(
                "\n    If you have questions about how to use HubPress, "
              ),
              t(
                "a",
                {
                  attrs: {
                    href: "https://hubpress.gitbooks.io/hubpress-knowledgebase/content/",
                  },
                },
                [this._v("here is the right place.")]
              ),
            ]);
          },
        ],
      };
      t.a = i;
    },
    NpFX: function (e, t, n) {
      "use strict";
      var i = n("FoP8"),
        o = n("XO7e");
      var r = function (e) {
          n("YDvP");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    Pm0L: function (e, t, n) {
      "use strict";
      n.d(t, "e", function () {
        return i;
      }),
        n.d(t, "f", function () {
          return o;
        }),
        n.d(t, "g", function () {
          return r;
        }),
        n.d(t, "h", function () {
          return a;
        }),
        n.d(t, "d", function () {
          return s;
        }),
        n.d(t, "c", function () {
          return c;
        }),
        n.d(t, "b", function () {
          return u;
        }),
        n.d(t, "a", function () {
          return l;
        });
      var i = "login:submit",
        o = "login:updateEmail",
        r = "login:updatePassword",
        a = "login:updateTwoFactorCode",
        s = "authorisation:request-login",
        c = "authorisation:receive-login",
        u = "authorisation:failure-login",
        l = "authorisation:authentication-done";
    },
    Q7NK: function (e, t, n) {
      "use strict";
      (function (e, t) {
        var i,
          o = n("pFYg"),
          r = n.n(o);
        (i = function (e) {
          e.defineMode("asciidoc", function (e, t) {
            var n = 1e3,
              i = function (e) {
                for (var t in ((this.states = e),
                (this.regExps = {}),
                (this.matchMappings = {}),
                this.states)) {
                  for (
                    var n = this.states[t],
                      i = [],
                      o = 0,
                      r = (this.matchMappings[t] = { defaultToken: "text" }),
                      a = "g",
                      s = [],
                      c = 0;
                    c < n.length;
                    c++
                  ) {
                    var u = n[c];
                    if (
                      (u.defaultToken && (r.defaultToken = u.defaultToken),
                      u.caseInsensitive && (a = "gi"),
                      null != u.regex)
                    ) {
                      u.regex instanceof RegExp &&
                        (u.regex = u.regex.toString().slice(1, -1));
                      var l = u.regex,
                        p =
                          new RegExp("(?:(" + l + ")|(.))").exec("a").length -
                          2;
                      if (Array.isArray(u.token))
                        if (1 == u.token.length || 1 == p) u.token = u.token[0];
                        else {
                          if (p - 1 != u.token.length)
                            throw new Error(
                              "number of classes and regexp groups in '" +
                                u.token +
                                "'\n'" +
                                u.regex +
                                "' doesn't match\n" +
                                (p - 1) +
                                "!=" +
                                u.token.length
                            );
                          (u.tokenArray = u.token),
                            (u.token = null),
                            (u.onMatch = this.$arrayTokens);
                        }
                      else
                        "function" != typeof u.token ||
                          u.onMatch ||
                          (u.onMatch = p > 1 ? this.$applyToken : u.token);
                      p > 1 &&
                        (/\\\d/.test(u.regex)
                          ? (l = u.regex.replace(
                              /\\([0-9]+)/g,
                              function (e, t) {
                                return "\\" + (parseInt(t, 10) + o + 1);
                              }
                            ))
                          : ((p = 1),
                            (l = this.removeCapturingGroups(u.regex))),
                        u.splitRegex ||
                          "string" == typeof u.token ||
                          s.push(u)),
                        (r[o] = c),
                        (o += p),
                        i.push(l),
                        u.onMatch || (u.onMatch = null);
                    }
                  }
                  s.forEach(function (e) {
                    e.splitRegex = this.createSplitterRegexp(e.regex, a);
                  }, this),
                    (this.regExps[t] = new RegExp(
                      "(" + i.join(")|(") + ")|($)",
                      a
                    ));
                }
              };
            (function () {
              (this.$setMaxTokenCount = function (e) {
                n = 0 | e;
              }),
                (this.$applyToken = function (e) {
                  var t = this.splitRegex.exec(e).slice(1),
                    n = this.token.apply(this, t);
                  if ("string" == typeof n) return [{ type: n, value: e }];
                  for (var i = [], o = 0, r = n.length; o < r; o++)
                    t[o] && (i[i.length] = { type: n[o], value: t[o] });
                  return i;
                }),
                (this.$arrayTokens = function (e) {
                  if (!e) return [];
                  var t = this.splitRegex.exec(e);
                  if (!t) return "text";
                  for (
                    var n = [], i = this.tokenArray, o = 0, r = i.length;
                    o < r;
                    o++
                  )
                    t[o + 1] && (n[n.length] = { type: i[o], value: t[o + 1] });
                  return n;
                }),
                (this.removeCapturingGroups = function (e) {
                  return e.replace(
                    /\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,
                    function (e, t) {
                      return t ? "(?:" : e;
                    }
                  );
                }),
                (this.createSplitterRegexp = function (e, t) {
                  if (-1 != e.indexOf("(?=")) {
                    var n = 0,
                      i = !1,
                      o = {};
                    e.replace(
                      /(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g,
                      function (e, t, r, a, s, c) {
                        return (
                          i
                            ? (i = "]" != s)
                            : s
                            ? (i = !0)
                            : a
                            ? (n == o.stack &&
                                ((o.end = c + 1), (o.stack = -1)),
                              n--)
                            : r &&
                              (n++,
                              1 != r.length && ((o.stack = n), (o.start = c))),
                          e
                        );
                      }
                    ),
                      null != o.end &&
                        /^\)*$/.test(e.substr(o.end)) &&
                        (e = e.substring(0, o.start) + e.substr(o.end));
                  }
                  return new RegExp(e, (t || "").replace("g", ""));
                }),
                (this.getLineTokens = function (e, t) {
                  if (t && "string" != typeof t) t = (i = t.slice(0))[0];
                  else var i = [];
                  var o = t || "start",
                    r = this.states[o];
                  r || ((o = "start"), (r = this.states[o]));
                  var a = this.matchMappings[o],
                    s = this.regExps[o];
                  s.lastIndex = 0;
                  for (
                    var c, u = [], l = 0, p = { type: null, value: "" };
                    (c = s.exec(e));

                  ) {
                    var d = a.defaultToken,
                      f = null,
                      h = c[0],
                      g = s.lastIndex;
                    if (g - h.length > l) {
                      var m = e.substring(l, g - h.length);
                      p.type == d
                        ? (p.value += m)
                        : (p.type && u.push(p), (p = { type: d, value: m }));
                    }
                    for (var v = 0; v < c.length - 2; v++)
                      if (void 0 !== c[v + 1]) {
                        (d = (f = r[a[v]]).onMatch
                          ? f.onMatch(h, o, i)
                          : f.token),
                          f.next &&
                            ((o =
                              "string" == typeof f.next
                                ? f.next
                                : f.next(o, i)),
                            (r = this.states[o]) ||
                              (window.console &&
                                console.error &&
                                console.error(o, "doesn't exist"),
                              (o = "start"),
                              (r = this.states[o])),
                            (a = this.matchMappings[o]),
                            (l = g),
                            ((s = this.regExps[o]).lastIndex = g));
                        break;
                      }
                    if (h)
                      if ("string" == typeof d)
                        (f && !1 === f.merge) || p.type !== d
                          ? (p.type && u.push(p), (p = { type: d, value: h }))
                          : (p.value += h);
                      else if (d) {
                        p.type && u.push(p), (p = { type: null, value: "" });
                        for (v = 0; v < d.length; v++) u.push(d[v]);
                      }
                    if (l == e.length) break;
                    if (((l = g), u.length > n)) {
                      for (; l < e.length; )
                        p.type && u.push(p),
                          (p = {
                            value: e.substring(l, (l += 2e3)),
                            type: "overflow",
                          });
                      (o = "start"), (i = []);
                      break;
                    }
                  }
                  return (
                    p.type && u.push(p),
                    i.length > 1 && i[0] !== o && i.unshift(o),
                    { tokens: u, state: i.length ? i : o }
                  );
                });
            }.call(i.prototype));
            var o = {
                empty: null,
                text: null,
                keyword: "keyword",
                control: "keyword",
                operator: "operator",
                constant: "atom",
                numeric: "number",
                character: "atom",
                escape: "atom",
                variable: "variable",
                parameter: "variable-3",
                language: "variable-2",
                comment: "comment",
                line: "comment",
                "double-slash": "comment",
                "double-dash": "comment",
                "number-sign": "comment",
                percentage: "comment",
                block: "comment",
                doc: "comment",
                string: "string",
                quoted: "string",
                single: "string",
                double: "string",
                triple: "string",
                unquoted: "string",
                interpolated: "string",
                regexp: "string-2",
                meta: "keyword",
                literal: "qualifier",
                support: "builtin",
                markup: "tag",
                underline: "link",
                link: "link",
                strong: "strong",
                heading: "header",
                heading2: "header-2",
                heading3: "header-3",
                heading4: "header-4",
                heading5: "header-5",
                heading6: "header-6",
                em: "em",
                list: "variable-2",
                numbered: "variable-2",
                unnumbered: "variable-2",
                quote: "quote",
                raw: "variable-2",
                invalid: "error",
                illegal: "invalidchar",
                deprecated: "error",
              },
              r = function (e, t) {
                var n = t.plannedTokens.shift();
                return void 0 === n
                  ? null
                  : (e.match(n.value),
                    (function (e) {
                      for (var t = null, n = 0; n < e.length; n++)
                        void 0 !== o[e[n]] && (t = o[e[n]]);
                      return t;
                    })(n.type.split(".")));
              },
              a = function (e, t) {
                if (t.plannedTokens.length > 0) return r(e, t);
                var n = t.current,
                  i = e.match(/.*$/, !1)[0],
                  o = s.getLineTokens(i, n);
                return (
                  (t.plannedTokens = o.tokens), (t.current = o.state), r(e, t)
                );
              },
              s = new i(
                new (function () {
                  function e(e) {
                    return (
                      (/\w/.test(e) ? "\\b" : "(?:\\B|^)") +
                      e +
                      "[^" +
                      e +
                      "].*?" +
                      e +
                      "(?![\\w*])"
                    );
                  }
                  this.$rules = {
                    start: [
                      { token: "empty", regex: /$/ },
                      {
                        token: "literal",
                        regex: /^\.{4,}\s*$/,
                        next: "listingBlock",
                      },
                      {
                        token: "literal",
                        regex: /^-{4,}\s*$/,
                        next: "literalBlock",
                      },
                      {
                        token: "literal",
                        regex: /^\+{4,}\s*$/,
                        next: "passthroughBlock",
                      },
                      { token: "keyword", regex: /^={4,}\s*$/ },
                      { token: "text", regex: /^\s*$/ },
                      {
                        token: "empty",
                        regex: "",
                        next: "dissallowDelimitedBlock",
                      },
                    ],
                    dissallowDelimitedBlock: [
                      { include: "paragraphEnd" },
                      { token: "comment", regex: "^//.+$" },
                      {
                        token: "keyword",
                        regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s",
                      },
                      { include: "listStart" },
                      {
                        token: "literal",
                        regex: /^\s+.+$/,
                        next: "indentedBlock",
                      },
                      { token: "empty", regex: "", next: "text" },
                    ],
                    paragraphEnd: [
                      {
                        token: "doc.comment",
                        regex: /^\/{4,}\s*$/,
                        next: "commentBlock",
                      },
                      {
                        token: "tableBlock",
                        regex: /^\s*[|!]=+\s*$/,
                        next: "tableBlock",
                      },
                      {
                        token: "keyword",
                        regex: /^(?:--|''')\s*$/,
                        next: "start",
                      },
                      { token: "option", regex: /^\[.*\]\s*$/, next: "start" },
                      { token: "pageBreak", regex: /^>{3,}$/, next: "start" },
                      {
                        token: "literal",
                        regex: /^\.{4,}\s*$/,
                        next: "listingBlock",
                      },
                      {
                        token: "titleUnderline",
                        regex: /^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle",
                        regex: /^={1}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle2",
                        regex: /^={2}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle3",
                        regex: /^={3}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle4",
                        regex: /^={4}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle5",
                        regex: /^={5}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "singleLineTitle6",
                        regex: /^={6}\s+\S.*$/,
                        next: "start",
                      },
                      {
                        token: "otherBlock",
                        regex: /^(?:\*{2,}|_{2,})\s*$/,
                        next: "start",
                      },
                      {
                        token: "optionalTitle",
                        regex: /^\.[^.\s].+$/,
                        next: "start",
                      },
                    ],
                    listStart: [
                      {
                        token: "keyword",
                        regex:
                          /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,
                        next: "listText",
                      },
                      {
                        token: "meta.tag",
                        regex: /^.+(?::{2,4}|;;)(?: |$)/,
                        next: "listText",
                      },
                      { token: "keyword", regex: /^\+\s*$/, next: "start" },
                    ],
                    text: [
                      {
                        token: ["link", "link"],
                        regex:
                          /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/,
                      },
                      {
                        token: ["link", "link"],
                        regex:
                          /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/,
                      },
                      { token: "link", regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/ },
                      { include: "macros" },
                      { include: "paragraphEnd" },
                      {
                        token: "literal",
                        regex: /\+{3,}/,
                        next: "smallPassthrough",
                      },
                      {
                        token: "escape",
                        regex:
                          /\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/,
                      },
                      { token: "escape", regex: /\\[_*'`+#]|\\{2}[_*'`+#]{2}/ },
                      { token: "keyword", regex: /\s\+$/ },
                      { token: "text", regex: "[a-zA-Z¡-￿]+\\b" },
                      {
                        token: ["keyword", "string", "keyword"],
                        regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/,
                      },
                      { token: "keyword", regex: /<<[\w\d\-$]+,?|>>/ },
                      {
                        token: "constant.character",
                        regex: /\({2,3}.*?\){2,3}/,
                      },
                      {
                        token: "support.function.list.callout",
                        regex: /^(?:<\d+>|\d+>|>) /,
                        next: "text",
                      },
                      { token: "keyword", regex: /\[\[.+?\]\]/ },
                      { token: "support", regex: /^\[{3}[\w\d =\-]+\]{3}/ },
                      { include: "quotes" },
                      { token: "empty", regex: /^\s*$/, next: "start" },
                    ],
                    listText: [{ include: "listStart" }, { include: "text" }],
                    indentedBlock: [
                      {
                        token: "literal",
                        regex: /^[\s\w].+$/,
                        next: "indentedBlock",
                      },
                      { token: "literal", regex: "", next: "start" },
                    ],
                    listingBlock: [
                      {
                        token: "literal",
                        regex: /^\.{4,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "constant.numeric", regex: "<\\d+>" },
                      { token: "literal", regex: "[^<]+" },
                      { token: "literal", regex: "<" },
                    ],
                    literalBlock: [
                      {
                        token: "literal",
                        regex: /^-{4,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "constant.numeric", regex: "<\\d+>" },
                      { token: "literal", regex: "[^<]+" },
                      { token: "literal", regex: "<" },
                    ],
                    passthroughBlock: [
                      {
                        token: "literal",
                        regex: /^\+{4,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "literal", regex: "[a-zA-Z¡-￿]+\\b|\\d+" },
                      { include: "macros" },
                      { token: "literal", regex: "." },
                    ],
                    smallPassthrough: [
                      {
                        token: "literal",
                        regex: /[+]{3,}/,
                        next: "dissallowDelimitedBlock",
                      },
                      {
                        token: "literal",
                        regex: /^\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "literal", regex: "[a-zA-Z¡-￿]+\\b|\\d+" },
                      { include: "macros" },
                    ],
                    commentBlock: [
                      {
                        token: "doc.comment",
                        regex: /^\/{4,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "doc.comment", regex: "^.*$" },
                    ],
                    tableBlock: [
                      {
                        token: "tableBlock",
                        regex: /^\s*\|={3,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      {
                        token: "tableBlock",
                        regex: /^\s*!={3,}\s*$/,
                        next: "innerTableBlock",
                      },
                      { token: "tableBlock", regex: /\|/ },
                      { include: "text", noEscape: !0 },
                    ],
                    innerTableBlock: [
                      {
                        token: "tableBlock",
                        regex: /^\s*!={3,}\s*$/,
                        next: "tableBlock",
                      },
                      {
                        token: "tableBlock",
                        regex: /^\s*|={3,}\s*$/,
                        next: "dissallowDelimitedBlock",
                      },
                      { token: "tableBlock", regex: /\!/ },
                    ],
                    macros: [
                      { token: "macro", regex: /{[\w\-$]+}/ },
                      {
                        token: [
                          "text",
                          "string",
                          "text",
                          "constant.character",
                          "text",
                        ],
                        regex: /({)([\w\-$]+)(:)?(.+)?(})/,
                      },
                      {
                        token: [
                          "text",
                          "markup.list.macro",
                          "keyword",
                          "string",
                        ],
                        regex:
                          /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/,
                      },
                      {
                        token: ["markup.list.macro", "keyword", "string"],
                        regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/,
                      },
                      {
                        token: ["markup.list.macro", "keyword"],
                        regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/,
                      },
                      { token: "keyword", regex: /^:.+?:(?= |$)/ },
                    ],
                    quotes: [
                      { token: "string.italic", regex: /__[^_\s].*?__/ },
                      { token: "string.italic", regex: e("_") },
                      { token: "keyword.bold", regex: /\*\*[^*\s].*?\*\*/ },
                      { token: "keyword.bold", regex: e("\\*") },
                      { token: "literal", regex: /\+\+[^+\s].*?\+\+/ },
                      { token: "literal", regex: e("\\+") },
                      { token: "literal", regex: /\$\$.+?\$\$/ },
                      { token: "literal", regex: e("\\$") },
                      { token: "literal", regex: /``[^`\s].*?``/ },
                      { token: "literal", regex: e("`") },
                      { token: "keyword", regex: /\^[^\^].*?\^/ },
                      { token: "keyword", regex: e("\\^") },
                      { token: "keyword", regex: /~[^~].*?~/ },
                      { token: "keyword", regex: e("~") },
                      { token: "keyword", regex: /##?/ },
                      { token: "keyword", regex: /(?:\B|^)``|\b''/ },
                    ],
                  };
                  var t = {
                    macro: "constant.character",
                    tableBlock: "doc.comment",
                    titleUnderline: "markup.heading",
                    singleLineTitle: "markup.heading",
                    singleLineTitle2: "markup.heading2",
                    singleLineTitle3: "markup.heading3",
                    singleLineTitle4: "markup.heading4",
                    singleLineTitle5: "markup.heading5",
                    singleLineTitle6: "markup.heading6",
                    pageBreak: "string",
                    option: "string.regexp",
                    otherBlock: "markup.list",
                    literal: "support.function",
                    optionalTitle: "constant.numeric",
                    escape: "constant.language.escape",
                    link: "markup.underline.list",
                  };
                  for (var n in this.$rules)
                    for (var i = this.$rules[n], o = i.length; o--; ) {
                      var r = i[o];
                      if (r.include || "string" == typeof r) {
                        var a = [o, 1].concat(this.$rules[r.include || r]);
                        r.noEscape &&
                          (a = a.filter(function (e) {
                            return !e.next;
                          })),
                          i.splice.apply(i, a);
                      } else r.token in t && (r.token = t[r.token]);
                    }
                })().$rules
              );
            return {
              startState: function () {
                return { current: "start", plannedTokens: [] };
              },
              blankLine: function (e) {
                a("", e);
              },
              token: a,
            };
          }),
            e.defineMIME("text/x-asciidoc", "asciidoc");
        }),
          "object" ==
            ("undefined" == typeof exports ? "undefined" : r()(exports)) &&
          "object" == r()(e)
            ? i(n("8U58"))
            : "object" ==
                ("undefined" == typeof brackets
                  ? "undefined"
                  : r()(brackets)) && brackets.getModule
            ? i(brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"))
            : "function" == typeof define && n("nErl")
            ? define(["codemirror"], i)
            : i(t);
      }.call(t, n("f1Eh")(e), n("8U58")));
    },
    QMmS: function (e, t, n) {
      "use strict";
      (t.b = function (e) {
        return (
          e.on("application:stores", function (e) {
            var t;
            console.info("authenticationPlugin - application:stores"),
              console.log("authenticationPlugin - application:stores", e);
            var n = {
              state: {
                isAuthenticated: !1,
                isTwoFactorCodeRequired: !1,
                credentials: {
                  email: void 0,
                  password: void 0,
                  twoFactorCode: void 0,
                },
              },
              mutations:
                ((t = {}),
                o()(t, u.f, function (e, t) {
                  e.credentials.email = t;
                }),
                o()(t, u.g, function (e, t) {
                  e.credentials.password = t;
                }),
                o()(t, u.h, function (e, t) {
                  e.credentials.twoFactorCode = t;
                }),
                o()(t, u.d, function (e) {
                  e.isLoading = !0;
                }),
                o()(t, u.c, function (e, t) {
                  a.a.merge(e, t);
                }),
                o()(t, u.b, function (e, t) {
                  e.isAuthenticated = !1;
                }),
                o()(t, l, function (e, t) {
                  a.a.merge(e, t.authentication);
                }),
                t),
              actions: o()({}, u.e, function (e, t) {
                var n = e.dispatch,
                  i = e.commit,
                  o = e.rootState,
                  r = e.state;
                i(u.d);
                var c = {
                  rootState: a.a.cloneDeep(o),
                  currentState: a.a.cloneDeep(r),
                };
                n("application:loading")
                  .then(function (e) {
                    return s.a.authenticate(c);
                  })
                  .then(function (e) {
                    i(u.c, e.nextState);
                  })
                  .then(function (e) {
                    return r.isAuthenticated
                      ? n(p, !0).then(function (e) {
                          return n(u.a);
                        })
                      : r.isTwoFactorCodeRequired
                      ? n("application:notify", {
                          icon: "unlock",
                          header: "Two factor code",
                          message:
                            "A code is required to complete your authentication.",
                          level: "warning",
                        })
                      : n("application:notify", {
                          icon: "warning circle",
                          header: "Authentication failed",
                          message: "A error occured during the authentication.",
                          level: "error",
                        });
                  })
                  .then(function (e) {
                    return n("application:loaded");
                  })
                  .then(function (e) {
                    return t.push(t.currentRoute.query.redirect || "/");
                  })
                  .catch(function (e) {
                    n("application:loaded").then(function (e) {
                      return n("application:notify", {
                        icon: "warning circle",
                        header: "Authentication failed",
                        message: "A error occured during the authentication.",
                        level: "error",
                      });
                    });
                  });
              }),
              getters: {},
            };
            return (
              (e.nextState.stores.authentication = n),
              console.log(
                "authenticationPlugin - application:stores - return",
                e
              ),
              e
            );
          }),
          e.on("application:routes", function (e) {
            return e;
          }),
          e.on("application:initialize-app", function (e) {
            return (
              console.info("authenticationPlugin - application:initialize-app"),
              console.log(
                "authenticationPlugin - application:initialize-app",
                e
              ),
              s.a.initialize(e).then(function (e) {
                return e;
              })
            );
          }),
          e.on("authentication:authenticate", function (e) {
            return (
              console.info(
                "authenticationPlugin - authentication:authenticate"
              ),
              console.log(
                "authenticationPlugin - authentication:authenticate",
                e,
                s.a
              ),
              s.a.authenticate(e)
            );
          }),
          {
            getName: function () {
              return "authenticationPlugin";
            },
          }
        );
      }),
        n.d(t, "a", function () {
          return d;
        });
      var i = n("bOdI"),
        o = n.n(i),
        r = n("M4fF"),
        a = n.n(r),
        s = n("KMrN"),
        c = n("RUoO"),
        u = n("Pm0L"),
        l = "application:initialize-app",
        p = "application:save-config";
      var d = c.a;
    },
    RUoO: function (e, t, n) {
      "use strict";
      var i = n("6yLl"),
        o = n("oS0V");
      var r = function (e) {
          n("Mha6");
        },
        a = n("VU/8")(i.a, o.a, !1, r, "data-v-94154cf6", null);
      t.a = a.exports;
    },
    RsIG: function (e, t, n) {
      "use strict";
      var i = n("woOf"),
        o = n.n(i),
        r = n("LEOq"),
        a = n.n(r);
      function s(e) {
        return a.a.fire("application:receive-config", e);
      }
      t.a = {
        initializeRoutes: function (e) {
          return a.a.fire("application:routes", e);
        },
        initializeApp: function (e, t) {
          return a.a.fire("application:initialize-app", e, t);
        },
        initializePlugins: function (e, t) {
          return a.a.fire("application:initialize-plugins", e, t);
        },
        initializeConfig: function (e) {
          return (
            console.log("application - initializeConfig", e),
            (function (e) {
              return a.a.fire("application:request-config", e);
            })(e).then(s)
          );
        },
        startUpConfig: function (e) {
          return console.log("application - startUpConfig", e), s(e);
        },
        prepareConfig: function (e) {
          return a.a.fire("application:prepare-config", e);
        },
        saveConfig: function (e) {
          return (function (e) {
            return (
              console.log("application - fireRequestSaveConfig", e),
              a.a.fire("application:request-save-config", e)
            );
          })(e)
            .then(function (t) {
              return o()({}, e, { nextState: t.nextState.application });
            })
            .then(s)
            .then(function (t) {
              return (e.nextState.application = t.nextState), o()({}, e);
            })
            .catch(function (e) {
              console.log(e);
            });
        },
        saveConfigDone: function (e) {
          return a.a.fire("application:save-config-done", e);
        },
      };
    },
    SDLk: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          this.$createElement;
          this._self._c;
          return this._m(0);
        },
        staticRenderFns: [
          function () {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n("div", { staticClass: "about-container" }, [
              n("div", { staticClass: "ui fixed inverted menu" }, [
                n("div", { staticClass: "right menu" }, [
                  n(
                    "a",
                    {
                      staticClass: "item",
                      attrs: {
                        href: "https://twitter.com/HubPressIO",
                        target: "_blank",
                      },
                    },
                    [
                      n(
                        "div",
                        {
                          staticClass: "ui icon",
                          attrs: {
                            "data-tooltip": "Follow us on twitter",
                            "data-position": "bottom right",
                          },
                        },
                        [n("i", { staticClass: "twitter large icon" })]
                      ),
                    ]
                  ),
                  n(
                    "a",
                    {
                      staticClass: "item",
                      attrs: {
                        href: "https://gitter.im/HubPress/hubpress.io",
                        target: "_blank",
                      },
                    },
                    [
                      n(
                        "div",
                        {
                          staticClass: "ui icon",
                          attrs: {
                            "data-tooltip": "Wanna chat with us?",
                            "data-position": "bottom right",
                          },
                        },
                        [n("i", { staticClass: "gitter large icon" })]
                      ),
                    ]
                  ),
                  n(
                    "a",
                    {
                      staticClass: "item",
                      attrs: {
                        href: "https://github.com/HubPress",
                        target: "_blank",
                      },
                    },
                    [
                      n(
                        "div",
                        {
                          staticClass: "ui icon",
                          attrs: {
                            "data-tooltip": "HubPress is opensource :)",
                            "data-position": "bottom right",
                          },
                        },
                        [n("i", { staticClass: "github large icon" })]
                      ),
                    ]
                  ),
                ]),
              ]),
              n("div", { staticClass: "about-content" }, [
                n("div", { staticClass: "ui container" }, [
                  n("h2", { staticClass: "ui center aligned icon header" }, [
                    n("i", { staticClass: "circular users icon" }),
                    e._v("\n            The HubPress Team\n          "),
                  ]),
                  n("div", { staticClass: "ui divider" }),
                  n("div", { staticClass: "row" }, [
                    n("div", { staticClass: "ui items divided" }, [
                      n("div", { staticClass: "item" }, [
                        n("div", { staticClass: "image" }, [
                          n("img", {
                            attrs: {
                              src: "https://avatars1.githubusercontent.com/u/2006548?v=3&s=460",
                            },
                          }),
                        ]),
                        n("div", { staticClass: "content" }, [
                          n("a", { staticClass: "header" }, [
                            e._v("Anthonny Quérouil"),
                          ]),
                          n("div", { staticClass: "meta" }, [
                            n("span", [e._v("The creator of HubPress")]),
                          ]),
                          n("div", { staticClass: "description" }, [
                            n("p", [
                              e._v(
                                "Anthonny is a freelance developer and the creator of HubPress"
                              ),
                            ]),
                            n("p", [e._v("He started HubPress two years ago")]),
                          ]),
                          n("div", { staticClass: "extra" }, [
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "https://twitter.com/anthonny_q",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "twitter icon" }),
                                e._v(
                                  " Twitter\n                              "
                                ),
                              ]
                            ),
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "https://github.com/anthonny",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "github icon" }),
                                e._v(" GitHub\n                              "),
                              ]
                            ),
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "http://anthonnyquerouil.fr/",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "home icon" }),
                                e._v(
                                  " Website\n                              "
                                ),
                              ]
                            ),
                          ]),
                        ]),
                      ]),
                      n("div", { staticClass: "item" }, [
                        n("div", { staticClass: "image" }, [
                          n("img", {
                            attrs: {
                              src: "https://avatars0.githubusercontent.com/u/952793?v=3&s=460",
                            },
                          }),
                        ]),
                        n("div", { staticClass: "content" }, [
                          n("a", { staticClass: "header" }, [
                            e._v("Jared Morgan"),
                          ]),
                          n("div", { staticClass: "meta" }, [
                            n("span", [e._v("The Docs guy")]),
                          ]),
                          n("div", { staticClass: "description" }, [
                            n("p", [
                              e._v(
                                "By day, Jared is a Certified Scrum Product Owner (CSPO) and Technical Writer for Ladbrokes in Brisbane, Australia."
                              ),
                            ]),
                            n("p", [
                              e._v(
                                "By night, he uses his craft to improve open source software products one README at a time."
                              ),
                            ]),
                            n("p", [
                              e._v(
                                "In between, he uses his expertise in Pinball machines and knowledge of Android beta testing to improve digital pinball apps."
                              ),
                            ]),
                          ]),
                          n("div", { staticClass: "extra" }, [
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "https://twitter.com/jaredmorgs",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "twitter icon" }),
                                e._v(
                                  " Twitter\n                              "
                                ),
                              ]
                            ),
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "https://github.com/jaredmorgs",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "github icon" }),
                                e._v(" GitHub\n                              "),
                              ]
                            ),
                            n(
                              "a",
                              {
                                staticClass: "ui label",
                                attrs: {
                                  href: "http://jaredleonmorgan.net/",
                                  target: "_blank",
                                },
                              },
                              [
                                n("i", { staticClass: "home icon" }),
                                e._v(
                                  " Website\n                              "
                                ),
                              ]
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]);
          },
        ],
      };
      t.a = i;
    },
    SHkU: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n(
            "div",
            [
              e._l(e.navigation, function (t, i) {
                return n("div", { key: t.label, staticClass: "fields" }, [
                  n("div", { staticClass: "four wide field" }, [
                    n("input", {
                      attrs: {
                        type: "text",
                        placeholder: "Label",
                        name: "navigation-label-" + i,
                      },
                      domProps: { value: t.label },
                    }),
                  ]),
                  n("div", { staticClass: "eleven wide field" }, [
                    n("input", {
                      attrs: {
                        type: "text",
                        placeholder: "http://www.mysite.com",
                        name: "navigation-url-" + i,
                      },
                      domProps: { value: t.url },
                    }),
                  ]),
                  n("div", { staticClass: "one wide field" }, [
                    n(
                      "button",
                      {
                        staticClass: "ui icon button",
                        on: {
                          click: function (t) {
                            t.stopPropagation(),
                              t.preventDefault(),
                              e.remove(i);
                          },
                        },
                      },
                      [n("i", { staticClass: "trash icon" })]
                    ),
                  ]),
                ]);
              }),
              n("div", { staticClass: "fields" }, [
                n("div", { staticClass: "four wide field" }, [
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.newNav.label,
                        expression: "newNav.label",
                      },
                    ],
                    attrs: { type: "text", placeholder: "Label" },
                    domProps: { value: e.newNav.label },
                    on: {
                      input: function (t) {
                        t.target.composing ||
                          e.$set(e.newNav, "label", t.target.value);
                      },
                    },
                  }),
                ]),
                n("div", { staticClass: "eleven wide field" }, [
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: e.newNav.url,
                        expression: "newNav.url",
                      },
                    ],
                    attrs: {
                      type: "text",
                      placeholder: "http://www.mysite.com",
                    },
                    domProps: { value: e.newNav.url },
                    on: {
                      input: function (t) {
                        t.target.composing ||
                          e.$set(e.newNav, "url", t.target.value);
                      },
                    },
                  }),
                ]),
                n("div", { staticClass: "one wide field" }, [
                  n(
                    "button",
                    {
                      staticClass: "ui icon button",
                      attrs: { disabled: e.isNotValid },
                      on: {
                        click: function (t) {
                          t.stopPropagation(),
                            t.preventDefault(),
                            e.add(e.newNav);
                        },
                      },
                    },
                    [n("i", { staticClass: "add icon" })]
                  ),
                ]),
              ]),
            ],
            2
          );
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    SUis: function (e, t, n) {
      "use strict";
      (function (e) {
        var i = n("PJh5"),
          o = n.n(i),
          r = n("RJtx"),
          a = n.n(r),
          s = n("lYDI");
        t.a = {
          name: "posts",
          data: function () {
            return { postToDelete: {}, filterValue: "" };
          },
          beforeCreate: function () {},
          beforeMount: function () {
            this.$store.dispatch(s.a);
          },
          beforeDestroy: function () {
            e(".ui.basic.modal").remove();
          },
          mounted: function () {
            var t = this;
            e(".ui.basic.modal").modal({
              closable: !1,
              onDeny: function () {},
              onApprove: function () {
                t.$store.dispatch(s.d, t.postToDelete._id);
              },
            });
          },
          methods: {
            status: function (e) {
              return !e.published ? "Draft" : "Published";
            },
            type: function (e) {
              return e.type.replace(/\b\w/g, function (e) {
                return e.toUpperCase();
              });
            },
            publishedAt: function (e) {
              return (
                (!!e.published &&
                  e.published_at &&
                  o()(e.published_at).fromNow()) ||
                ""
              );
            },
            postCoverUrl: function (e) {
              var t = e.image || "https://hubpress.dev/img/logo.png";
              return (t = t.startsWith("http")
                ? t
                : e.attributes.$$smap.imagesdir + "/" + e.image);
            },
            getPostStatusColor: function (e) {
              return e.original
                ? e.original.content !== e.content
                  ? "orange"
                  : "green"
                : "red";
            },
            displayConfirmMessage: function (t) {
              (this.postToDelete = t), e(".ui.basic.modal").modal("show");
            },
            navigateToPost: function (e) {
              this.$router.push({ name: "post", params: { id: e._id } });
            },
            newPost: function () {
              this.$router.push({ name: "post", params: { id: a.a.v4() } });
            },
            getPostTags: function (e) {
              return e.tags || [];
            },
            getPostAuthor: function (e) {
              return (
                e.author || this.$store.state.authentication.userInformations
              );
            },
            synchronize: function () {
              this.$store.dispatch(s.b);
            },
          },
          computed: {
            posts: function () {
              var e = this.filterValue.trim();
              return "" === e
                ? this.$store.state.hubpress.posts
                : this.$store.state.hubpress.posts.filter(function (t) {
                    return (
                      t.title.toLowerCase().indexOf(e.toLowerCase()) >= 0 ||
                      (t.tags &&
                        t.tags.filter(function (t) {
                          return t.toLowerCase().indexOf(e.toLowerCase()) >= 0;
                        }).length)
                    );
                  });
            },
          },
        };
      }.call(t, n("7t+N")));
    },
    SjaB: function (e, t, n) {
      var i = n("3fVB");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("2d76ba14", i, !0, { sourceMap: !1 });
    },
    T23V: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i,
        o,
        r,
        a = n("pFYg"),
        s = n.n(a),
        c = n("mvHQ"),
        u = n.n(c),
        l = n("fZjL"),
        p = n.n(l),
        d = n("woOf"),
        f = n.n(d),
        h = n("Zzip"),
        g = n.n(h),
        m = n("5QVw"),
        v = n.n(m),
        b = n("//Fk"),
        x = n.n(b),
        C = n("I3G/"),
        y = n.n(C),
        w = n("unZF"),
        P = n("qcny"),
        k = n("YLfZ"),
        S =
          (this && this.__awaiter) ||
          function (e, t, n, i) {
            return new (n || (n = x.a))(function (o, r) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  r(e);
                }
              }
              function s(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  r(e);
                }
              }
              function c(e) {
                e.done
                  ? o(e.value)
                  : new n(function (t) {
                      t(e.value);
                    }).then(a, s);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
        _ =
          (this && this.__generator) ||
          function (e, t) {
            var n,
              i,
              o,
              r,
              a = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1];
                  return o[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (r = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof v.a &&
                (r[g.a] = function () {
                  return this;
                }),
              r
            );
            function s(r) {
              return function (s) {
                return (function (r) {
                  if (n) throw new TypeError("Generator is already executing.");
                  for (; a; )
                    try {
                      if (
                        ((n = 1),
                        i &&
                          (o =
                            i[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) &&
                          !(o = o.call(i, r[1])).done)
                      )
                        return o;
                      switch (((i = 0), o && (r = [0, o.value]), r[0])) {
                        case 0:
                        case 1:
                          o = r;
                          break;
                        case 4:
                          return a.label++, { value: r[1], done: !1 };
                        case 5:
                          a.label++, (i = r[1]), (r = [0]);
                          continue;
                        case 7:
                          (r = a.ops.pop()), a.trys.pop();
                          continue;
                        default:
                          if (
                            !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                            (6 === r[0] || 2 === r[0])
                          ) {
                            a = 0;
                            continue;
                          }
                          if (
                            3 === r[0] &&
                            (!o || (r[1] > o[0] && r[1] < o[3]))
                          ) {
                            a.label = r[1];
                            break;
                          }
                          if (6 === r[0] && a.label < o[1]) {
                            (a.label = o[1]), (o = r);
                            break;
                          }
                          if (o && a.label < o[2]) {
                            (a.label = o[2]), a.ops.push(r);
                            break;
                          }
                          o[2] && a.ops.pop(), a.trys.pop();
                          continue;
                      }
                      r = t.call(e, a);
                    } catch (e) {
                      (r = [6, e]), (i = 0);
                    } finally {
                      n = o = 0;
                    }
                  if (5 & r[0]) throw r[1];
                  return { value: r[0] ? r[1] : void 0, done: !0 };
                })([r, s]);
              };
            }
          },
        R = [],
        q = window.__NUXT__ || {},
        M = y.a.config.errorHandler;
      function $(e, t, n) {
        var i = function (e) {
          var i =
            (function (e, t) {
              for (var n = [], i = 2; i < arguments.length; i++)
                n[i - 2] = arguments[i];
              if (!e || !e.options || !e.options[t]) return {};
              var o = e.options[t];
              return "function" == typeof o ? o.apply(void 0, n) : o;
            })(e, "transition", t, n) || {};
          return "string" == typeof i ? { name: i } : i;
        };
        return e.map(function (e) {
          var t = f()({}, i(e));
          if (n && n.matched.length && n.matched[0].components.default) {
            var o = i(n.matched[0].components.default);
            p()(o)
              .filter(function (e) {
                return o[e] && -1 !== e.toLowerCase().indexOf("leave");
              })
              .forEach(function (e) {
                t[e] = o[e];
              });
          }
          return t;
        });
      }
      function D(e, t, n) {
        var i = this,
          o = [],
          r = !1;
        if (
          (void 0 !== n &&
            ((o = []),
            n.middleware && (o = o.concat(n.middleware)),
            e.forEach(function (e) {
              e.options.middleware && (o = o.concat(e.options.middleware));
            })),
          (o = o.map(function (e) {
            return "function" == typeof e
              ? e
              : ("function" != typeof w.a[e] &&
                  ((r = !0),
                  i.error({
                    statusCode: 500,
                    message: "Unknown middleware " + e,
                  })),
                w.a[e]);
          })),
          !r)
        )
          return Object(k.i)(o, t);
      }
      function j(e, t, n) {
        return S(this, void 0, void 0, function () {
          var o,
            a,
            s,
            c,
            u,
            l,
            p,
            d = this;
          return _(this, function (f) {
            switch (f.label) {
              case 0:
                return !1 === this._pathChanged && !1 === this._queryChanged
                  ? [2, n()]
                  : ((o = !1),
                    (a = function (e) {
                      if (
                        (t.path === e.path &&
                          d.$loading.finish &&
                          d.$loading.finish(),
                        t.path !== e.path &&
                          d.$loading.pause &&
                          d.$loading.pause(),
                        !o)
                      ) {
                        o = !0;
                        var i = [];
                        (R = Object(k.e)(t, i).map(function (e, n) {
                          return Object(k.b)(t.matched[i[n]].path)(t.params);
                        })),
                          n(e);
                      }
                    }),
                    [
                      4,
                      Object(k.m)(i, { route: e, from: t, next: a.bind(this) }),
                    ]);
              case 1:
                return (
                  f.sent(),
                  (this._dateLastError = i.nuxt.dateErr),
                  (this._hadError = !!i.nuxt.err),
                  (s = []),
                  (c = Object(k.e)(e, s)).length
                    ? [3, 5]
                    : [4, D.call(this, c, i.context)]
                );
              case 2:
                return (
                  f.sent(),
                  o
                    ? [2]
                    : [
                        4,
                        this.loadLayout(
                          "function" == typeof P.a.layout
                            ? P.a.layout(i.context)
                            : P.a.layout
                        ),
                      ]
                );
              case 3:
                return (p = f.sent()), [4, D.call(this, c, i.context, p)];
              case 4:
                return (
                  f.sent(),
                  o
                    ? [2]
                    : (i.context.error({
                        statusCode: 404,
                        message: "This page could not be found",
                      }),
                      [2, n()])
                );
              case 5:
                c.forEach(function (e) {
                  e._Ctor &&
                    e._Ctor.options &&
                    ((e.options.asyncData = e._Ctor.options.asyncData),
                    (e.options.fetch = e._Ctor.options.fetch));
                }),
                  this.setTransitions($(c, e, t)),
                  (f.label = 6);
              case 6:
                return (
                  f.trys.push([6, 11, , 13]), [4, D.call(this, c, i.context)]
                );
              case 7:
                return (
                  f.sent(),
                  o
                    ? [2]
                    : i.context._errored
                    ? [2, n()]
                    : ("function" == typeof (p = c[0].options.layout) &&
                        (p = p(i.context)),
                      [4, this.loadLayout(p)])
                );
              case 8:
                return (p = f.sent()), [4, D.call(this, c, i.context, p)];
              case 9:
                return (
                  f.sent(),
                  o
                    ? [2]
                    : i.context._errored
                    ? [2, n()]
                    : ((u = !0),
                      c.forEach(function (t) {
                        u &&
                          "function" == typeof t.options.validate &&
                          (u = t.options.validate({
                            params: e.params || {},
                            query: e.query || {},
                            store: r,
                          }));
                      }),
                      u
                        ? [
                            4,
                            x.a.all(
                              c.map(function (t, n) {
                                if (
                                  ((t._path = Object(k.b)(e.matched[s[n]].path)(
                                    e.params
                                  )),
                                  (t._dataRefresh = !1),
                                  d._pathChanged && t._path !== R[n])
                                )
                                  t._dataRefresh = !0;
                                else if (!d._pathChanged && d._queryChanged) {
                                  var o = t.options.watchQuery;
                                  !0 === o
                                    ? (t._dataRefresh = !0)
                                    : Array.isArray(o) &&
                                      (t._dataRefresh = o.some(function (e) {
                                        return d._diffQuery[e];
                                      }));
                                }
                                if (
                                  !d._hadError &&
                                  d._isMounted &&
                                  !t._dataRefresh
                                )
                                  return x.a.resolve();
                                var r = [],
                                  a =
                                    t.options.asyncData &&
                                    "function" == typeof t.options.asyncData,
                                  c = !!t.options.fetch,
                                  u = a && c ? 30 : 45;
                                if (a) {
                                  var l = Object(k.j)(
                                    t.options.asyncData,
                                    i.context
                                  ).then(function (e) {
                                    Object(k.a)(t, e),
                                      d.$loading.increase &&
                                        d.$loading.increase(u);
                                  });
                                  r.push(l);
                                }
                                if (c) {
                                  var p = t.options.fetch(i.context);
                                  (p &&
                                    (p instanceof x.a ||
                                      "function" == typeof p.then)) ||
                                    (p = x.a.resolve(p)),
                                    p.then(function (e) {
                                      d.$loading.increase &&
                                        d.$loading.increase(u);
                                    }),
                                    r.push(p);
                                }
                                return x.a.all(r);
                              })
                            ),
                          ]
                        : (this.error({
                            statusCode: 404,
                            message: "This page could not be found",
                          }),
                          [2, n()]))
                );
              case 10:
                return (
                  f.sent(),
                  o ||
                    (this.$loading.finish && this.$loading.finish(),
                    (R = c.map(function (t, n) {
                      return Object(k.b)(e.matched[s[n]].path)(e.params);
                    })),
                    n()),
                  [3, 13]
                );
              case 11:
                return (
                  (l = f.sent()) || (l = {}),
                  (R = []),
                  (l.statusCode =
                    l.statusCode ||
                    l.status ||
                    (l.response && l.response.status) ||
                    500),
                  "function" == typeof (p = P.a.layout) && (p = p(i.context)),
                  [4, this.loadLayout(p)]
                );
              case 12:
                return (
                  f.sent(),
                  this.error(l),
                  this.$nuxt.$emit("routeChanged", e, t, l),
                  n(!1),
                  [3, 13]
                );
              case 13:
                return [2];
            }
          });
        });
      }
      function L(e, t) {
        Object(k.c)(e, function (e, t, n, i) {
          return (
            "object" !== (void 0 === e ? "undefined" : s()(e)) ||
              e.options ||
              (((e = y.a.extend(e))._Ctor = e), (n.components[i] = e)),
            e
          );
        });
      }
      function T(e) {
        this._hadError &&
          this._dateLastError === this.$options.nuxt.dateErr &&
          this.error();
        var t = this.$options.nuxt.err
          ? P.a.layout
          : e.matched[0].components.default.options.layout;
        "function" == typeof t && (t = t(i.context)), this.setLayout(t);
      }
      (y.a.config.errorHandler = function (e, t, n) {
        var i = {
          statusCode: e.statusCode || e.name || "Whoops!",
          message: e.message || e.toString(),
        };
        if (
          (t &&
            t.$root &&
            t.$root.$nuxt &&
            t.$root.$nuxt.error &&
            "render function" !== n &&
            t.$root.$nuxt.error(i),
          "function" == typeof M)
        )
          return M.apply(void 0, arguments);
        console.error(e.message || i.message);
      }),
        Object(P.b)()
          .then(function (e) {
            return S(this, void 0, void 0, function () {
              var t, n, a;
              return _(this, function (s) {
                switch (s.label) {
                  case 0:
                    return (
                      (i = e.app),
                      (o = e.router),
                      (r = e.store),
                      [
                        4,
                        x.a.all(
                          (function (e) {
                            var t = this,
                              n = Object(k.d)(e.options.base, e.options.mode);
                            return Object(k.c)(
                              e.match(n),
                              function (e, n, i, o, r) {
                                return S(t, void 0, void 0, function () {
                                  var t;
                                  return _(this, function (n) {
                                    switch (n.label) {
                                      case 0:
                                        return "function" != typeof e ||
                                          e.options
                                          ? [3, 2]
                                          : [4, e()];
                                      case 1:
                                        (e = n.sent()), (n.label = 2);
                                      case 2:
                                        return (
                                          (t = (function (e, t) {
                                            q.serverRendered &&
                                              t &&
                                              Object(k.a)(e, t);
                                            return (e._Ctor = e), e;
                                          })(
                                            Object(k.l)(e),
                                            q.data ? q.data[r] : null
                                          )),
                                          (i.components[o] = t),
                                          [2, t]
                                        );
                                    }
                                  });
                                });
                              }
                            );
                          })(o)
                        ),
                      ]
                    );
                  case 1:
                    return (
                      (t = s.sent()),
                      (n = new y.a(i)),
                      (a = function () {
                        n.$mount("#__nuxt"),
                          y.a.nextTick(function () {
                            !(function (e) {
                              window._nuxtReadyCbs.forEach(function (t) {
                                "function" == typeof t && t(e);
                              }),
                                "function" == typeof window._onNuxtLoaded &&
                                  window._onNuxtLoaded(e);
                              o.afterEach(function (t, n) {
                                y.a.nextTick(function () {
                                  return e.$nuxt.$emit("routeChanged", t, n);
                                });
                              });
                            })(n);
                          });
                      }),
                      (n.setTransitions =
                        n.$options.nuxt.setTransitions.bind(n)),
                      t.length &&
                        (n.setTransitions($(t, o.currentRoute)),
                        (R = o.currentRoute.matched.map(function (e) {
                          return Object(k.b)(e.path)(o.currentRoute.params);
                        }))),
                      (n.$loading = {}),
                      q.error && n.error(q.error),
                      o.beforeEach(
                        function (e, t, n) {
                          return S(this, void 0, void 0, function () {
                            var o,
                              r,
                              a,
                              s = this;
                            return _(this, function (c) {
                              switch (c.label) {
                                case 0:
                                  (this._pathChanged =
                                    !!i.nuxt.err || t.path !== e.path),
                                    (this._queryChanged =
                                      u()(e.query) !== u()(t.query)),
                                    (this._diffQuery = this._queryChanged
                                      ? Object(k.g)(e.query, t.query)
                                      : []),
                                    this._pathChanged &&
                                      this.$loading.start &&
                                      this.$loading.start(),
                                    (c.label = 1);
                                case 1:
                                  return (
                                    c.trys.push([1, 3, , 4]),
                                    [4, Object(k.k)(e)]
                                  );
                                case 2:
                                  return (
                                    (o = c.sent()),
                                    !this._pathChanged &&
                                      this._queryChanged &&
                                      o.some(function (e) {
                                        var t = e.options.watchQuery;
                                        return (
                                          !0 === t ||
                                          (!!Array.isArray(t) &&
                                            t.some(function (e) {
                                              return s._diffQuery[e];
                                            }))
                                        );
                                      }) &&
                                      this.$loading.start &&
                                      this.$loading.start(),
                                    n(),
                                    [3, 4]
                                  );
                                case 3:
                                  return (
                                    (r = c.sent()),
                                    (a =
                                      (r = r || {}).statusCode ||
                                      r.status ||
                                      (r.response && r.response.status) ||
                                      500),
                                    this.error({
                                      statusCode: a,
                                      message: r.message,
                                    }),
                                    this.$nuxt.$emit("routeChanged", e, t, r),
                                    n(!1),
                                    [3, 4]
                                  );
                                case 4:
                                  return [2];
                              }
                            });
                          });
                        }.bind(n)
                      ),
                      o.beforeEach(j.bind(n)),
                      o.afterEach(L),
                      o.afterEach(
                        function (e, t) {
                          var n = this;
                          if (
                            !1 === this._pathChanged &&
                            !1 === this._queryChanged
                          )
                            return;
                          y.a.nextTick(function () {
                            var t = Object(k.f)(e, []);
                            t.forEach(function (e, t) {
                              if (
                                e &&
                                e.constructor._dataRefresh &&
                                R[t] === e.constructor._path &&
                                "function" == typeof e.constructor.options.data
                              ) {
                                var n = e.constructor.options.data.call(e);
                                for (var i in n) y.a.set(e.$data, i, n[i]);
                              }
                            }),
                              T.call(n, e);
                          });
                        }.bind(n)
                      ),
                      q.serverRendered
                        ? (a(), [2])
                        : (j.call(
                            n,
                            o.currentRoute,
                            o.currentRoute,
                            function (e) {
                              if (!e)
                                return (
                                  L(o.currentRoute, o.currentRoute),
                                  T.call(n, o.currentRoute),
                                  void a()
                                );
                              o.push(
                                e,
                                function () {
                                  return a();
                                },
                                function (e) {
                                  if (!e) return a();
                                  console.error(e);
                                }
                              );
                            }
                          ),
                          [2])
                    );
                }
              });
            });
          })
          .catch(function (e) {
            "ERR_REDIRECT" !== e.message &&
              console.error("[nuxt] Error while initializing app", e);
          });
    },
    THns: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        console.info("PostsGenerator - generate"),
          console.log("PostsGenerator - generate", e);
        var t = e;
        return (
          e.nextState.publishedPosts.forEach(function (e) {
            t = Object(o.a)(t, e);
          }),
          t
        );
      };
      n("APUd");
      var i = n("j+6P"),
        o = (n.n(i), n("KgKs"));
    },
    ThI1: function (e, t, n) {
      "use strict";
      var i = n("oz2E"),
        o = n("mBSI");
      var r = function (e) {
          n("yJpT");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    Tknw: function (e, t, n) {
      "use strict";
      var i = n("wrAo"),
        o = n("giiL");
      var r = function (e) {
          n("xgbc");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    WRRc: function (e, t, n) {
      "use strict";
      t.a = {
        name: "nuxt-link",
        functional: !0,
        render: function (e, t) {
          return e("router-link", t.data, t.children);
        },
      };
    },
    WVd9: function (e, t, n) {
      var i = n("d+j1");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("44e9cb4d", i, !0, { sourceMap: !1 });
    },
    WiUJ: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("hubpress:request-theme", function (e) {
          console.info("templatePlugin - hubpress:request-theme"),
            console.log("templatePlugin - hubpress:request-theme", e);
          var t,
            n,
            i,
            r,
            s,
            u = e.rootState.application.config.theme.name.toLowerCase(),
            p = e.rootState.application.config;
          return ((t = u),
          (n = p),
          (i = a.a.defer()),
          (r = []),
          (s = n.urls.hubpress),
          c.a
            .get(s + "/themes/" + t + "/theme.json?dt=" + Date.now())
            .end(function (e, n) {
              if (e) i.reject(e);
              else {
                var o = n.body,
                  u = o.version,
                  p = !1,
                  d = !1,
                  f = !1;
                if (
                  (l.a.toPairs(o.files).forEach(function (e) {
                    var n = a.a.defer();
                    r.push(n.promise),
                      (p = p || "pagination" === e[0]),
                      (d = d || "nav" === e[0]),
                      (f = f || "navigation" === e[0]),
                      c.a
                        .get(s + "/themes/" + t + "/" + e[1] + "?v=" + u)
                        .end(function (t, i) {
                          t
                            ? n.reject(t)
                            : n.resolve({
                                name: e[0],
                                path: e[1],
                                content: i.text,
                              });
                        });
                  }),
                  !p)
                ) {
                  var h = a.a.defer();
                  r.push(h.promise),
                    c.a
                      .get(s + "/hubpress/scripts/helpers/tpl/pagination.hbs")
                      .end(function (e, t) {
                        e
                          ? h.reject(e)
                          : h.resolve({
                              name: "pagination",
                              path: "partials/pagination",
                              content: t.text,
                            });
                      });
                }
                if (!d) {
                  var g = a.a.defer();
                  r.push(g.promise),
                    c.a
                      .get(s + "/hubpress/scripts/helpers/tpl/nav.hbs")
                      .end(function (e, t) {
                        e
                          ? g.reject(e)
                          : g.resolve({
                              name: "nav",
                              path: "partials/nav",
                              content: t.text,
                            });
                      });
                }
                if (!f) {
                  var m = a.a.defer();
                  r.push(m.promise),
                    c.a
                      .get(s + "/hubpress/scripts/helpers/tpl/navigation.hbs")
                      .end(function (e, t) {
                        e
                          ? m.reject(e)
                          : m.resolve({
                              name: "navigation",
                              path: "partials/navigation",
                              content: t.text,
                            });
                      });
                }
                a.a
                  .all(r)
                  .then(function (e) {
                    i.resolve({ version: u, files: e });
                  })
                  .catch(function (e) {
                    console.log(e), i.reject(e);
                  });
              }
            }),
          i.promise).then(function (t) {
            var n = { name: u, files: t.files, version: t.version };
            b.a.registerTheme(p, n), b.a.registerFiles(n.files);
            var i = o()({}, n);
            return (e.nextState = o()({}, e.nextState, { theme: i })), e;
          });
        }),
          e.on("requestGenerateIndex", function (e) {
            console.info("templatePlugin - requestGenerateIndex"),
              console.log("templatePlugin - requestGenerateIndex", e);
            var t = Object(p.a)(e);
            return (
              console.log("templatePlugin - requestGenerateIndex return", t), t
            );
          }),
          e.on("requestGeneratePost", function (e) {
            console.info("templatePlugin - requestGeneratePost"),
              console.log("templatePlugin - requestGeneratePost", e);
            var t = Object(d.a)(e, e.nextState.post);
            return (
              console.log("templatePlugin - requestGeneratePost return", t), t
            );
          }),
          e.on("requestGeneratePosts", function (e) {
            console.info("templatePlugin - requestGeneratePosts"),
              console.log("templatePlugin - requestGeneratePosts", e);
            var t = Object(f.a)(e);
            return (
              console.log("templatePlugin - requestGeneratePosts return", t), t
            );
          }),
          e.on("requestGeneratePages", function (e) {
            console.info("templatePlugin - requestGeneratePages"),
              console.log("templatePlugin - requestGeneratePages", e);
            var t = Object(h.a)(e);
            return (
              console.log("templatePlugin - requestGeneratePages return", t), t
            );
          }),
          e.on("requestGenerateTags", function (e) {
            console.info("templatePlugin - requestGenerateTags"),
              console.log("templatePlugin - requestGenerateTags", e);
            var t = Object(g.a)(e);
            return (
              console.log("templatePlugin - requestGenerateTags return", t), t
            );
          }),
          e.on("requestGenerateAuthors", function (e) {
            console.info("templatePlugin - requestGenerateAuthors"),
              console.log("templatePlugin - requestGenerateAuthors", e);
            var t = Object(m.a)(e);
            return (
              console.log("templatePlugin - requestGenerateAuthors return", t),
              t
            );
          });
      };
      var i = n("woOf"),
        o = n.n(i),
        r = n("/Luh"),
        a = n.n(r),
        s = n("GG98"),
        c = n.n(s),
        u = n("M4fF"),
        l = n.n(u),
        p = n("e3+D"),
        d = n("KgKs"),
        f = n("THns"),
        h = n("BdWi"),
        g = n("dZ6u"),
        m = n("KOTd"),
        v = n("j+6P"),
        b = n.n(v);
    },
    X5n4: function (e, t, n) {
      "use strict";
      n.d(t, "e", function () {
        return i;
      }),
        n.d(t, "c", function () {
          return o;
        }),
        n.d(t, "l", function () {
          return r;
        }),
        n.d(t, "i", function () {
          return a;
        }),
        n.d(t, "j", function () {
          return s;
        }),
        n.d(t, "k", function () {
          return c;
        }),
        n.d(t, "b", function () {
          return u;
        }),
        n.d(t, "d", function () {
          return l;
        }),
        n.d(t, "h", function () {
          return p;
        }),
        n.d(t, "a", function () {
          return d;
        }),
        n.d(t, "g", function () {
          return f;
        }),
        n.d(t, "f", function () {
          return h;
        });
      var i = "application:initialize-routes",
        o = "application:initialize-config",
        r = "application:save-startup-config",
        a = "application:prepare-config",
        s = "application:save-config",
        c = "application:save-config-done",
        u = "application:initialize-app",
        l = "application:initialize-plugins",
        p = "application:notify",
        d = "application:close-notification",
        f = "application:loading",
        h = "application:loaded";
    },
    XO7e: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", [
            e.iframe
              ? e._e()
              : n("div", { staticClass: "html-rendering" }, [
                  n("h1", { staticClass: "ui header" }, [
                    e._v(e._s(e.post.title)),
                  ]),
                  n("div", {
                    staticClass: "content",
                    attrs: { id: "html-content" },
                    domProps: { innerHTML: e._s(e.post.html) },
                  }),
                ]),
            e.iframe
              ? n("div", { staticClass: "iframe-rendering" }, [
                  n("iframe", {
                    staticClass: "published-preview",
                    attrs: {
                      srcdoc: e.post.publishedContent,
                      frameborder: "0",
                    },
                  }),
                ])
              : e._e(),
          ]);
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    XSDV: function (e, t, n) {
      var i = n("jAb+");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("5bd01218", i, !0, { sourceMap: !1 });
    },
    XkEn: function (e, t, n) {
      var i = n("dd07");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("1ce06800", i, !0, { sourceMap: !1 });
    },
    Y2j8: function (e, t, n) {
      "use strict";
      var i = n("woOf"),
        o = (n.n(i), n("/Luh")),
        r = (n.n(o), n("M4fF")),
        a = (n.n(r), n("RJtx")),
        s = (n.n(a), n("Wa/L")),
        c = n("tCkb");
      s.a.plugin(c.a), (window.PouchDB = s.a);
    },
    YDvP: function (e, t, n) {
      var i = n("qZPA");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("3ecfbf5a", i, !0, { sourceMap: !1 });
    },
    YG9q: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return c;
      }),
        (t.a = function (e) {
          return (
            e.on("application:routes", function (e) {
              return (
                console.info("applicationPlugin - application:routes"),
                console.log("applicationPlugin - application:routes", e),
                e.nextState.routes.push({
                  id: "application",
                  entries: [
                    { path: "settings", name: "settings", component: s.a },
                  ],
                }),
                console.log(
                  "applicationPlugin - application:routes - return",
                  e
                ),
                e
              );
            }),
            e.on("application:stores", function (e) {
              var t, n;
              console.info("applicationPlugin - application:stores"),
                console.log("applicationPlugin - application:stores", e);
              var i = {
                state: {
                  isInitialized: !1,
                  isFetching: !1,
                  isLoading: !1,
                  requireInitilisation: !1,
                  notification: {
                    icon: "save",
                    header: "My Header",
                    message: "A message",
                    level: "default",
                    isVisible: !1,
                  },
                  routes: [],
                  settingsTabs: [],
                },
                mutations:
                  ((t = {}),
                  o()(t, a.b, function (e, t) {
                    _.merge(e, t.application);
                  }),
                  o()(t, a.d, function (e, t) {
                    _.merge(e, t.application);
                  }),
                  o()(t, a.e, function (e, t) {
                    e.routes = t;
                  }),
                  o()(t, a.c, function (e, t) {
                    _.merge(e, t);
                  }),
                  o()(t, a.i, function (e, t) {
                    _.merge(e, t);
                  }),
                  o()(t, a.l, function (e, t) {
                    _.merge(e, t);
                  }),
                  o()(t, a.j, function (e, t) {
                    _.merge(e, t.application);
                  }),
                  o()(t, a.k, function (e, t) {
                    _.merge(e, t.application);
                  }),
                  o()(t, a.h, function (e, t) {
                    (t.isVisible = !0), _.merge(e.notification, t);
                  }),
                  o()(t, a.a, function (e, t) {
                    e.notification.isVisible = !1;
                  }),
                  o()(t, a.g, function (e, t) {
                    e.isLoading = !0;
                  }),
                  o()(t, a.f, function (e, t) {
                    e.isLoading = !1;
                  }),
                  t),
                actions:
                  ((n = {}),
                  o()(n, a.c, function (e) {
                    var t = e.commit,
                      n = e.rootState,
                      i = e.state,
                      o = {
                        rootState: _.cloneDeep(n),
                        currentState: _.cloneDeep(i),
                      };
                    return r.a.initializeConfig(o).then(function (e) {
                      t(a.c, e.nextState);
                    });
                  }),
                  o()(n, a.b, function (e) {
                    var t = e.commit,
                      n = e.rootState,
                      i =
                        (e.state,
                        {
                          rootState: _.cloneDeep(n),
                          currentState: _.cloneDeep(n),
                        });
                    return r.a.initializeApp(i).then(function (e) {
                      console.log("helllllllo", e), t(a.b, e.nextState);
                    });
                  }),
                  o()(n, a.d, function (e) {
                    var t = e.commit,
                      n = e.rootState,
                      i =
                        (e.state,
                        {
                          rootState: _.cloneDeep(n),
                          currentState: _.cloneDeep(n),
                        });
                    return r.a.initializePlugins(i).then(function (e) {
                      (e.nextState.application.isInitialized = !0),
                        t(a.d, e.nextState);
                    });
                  }),
                  o()(n, a.i, function (e, t) {
                    var n = e.dispatch,
                      i = e.commit,
                      o = e.rootState,
                      s = e.state,
                      c = {
                        rootState: _.cloneDeep(o),
                        currentState: _.cloneDeep(s),
                        nextState: _.cloneDeep(s),
                        payload: { formData: t },
                      };
                    return (
                      (c.currentState.isLoading = !0),
                      (c.nextState.isLoading = !0),
                      n(a.g)
                        .then(function (e) {
                          return r.a.prepareConfig(c);
                        })
                        .then(function (e) {
                          return i(a.i, e.nextState), n(a.j);
                        })
                    );
                  }),
                  o()(n, a.l, function (e, t) {
                    e.dispatch;
                    var n = e.commit,
                      i = e.rootState,
                      o = e.state,
                      s = {
                        rootState: _.cloneDeep(i),
                        currentState: _.cloneDeep(o),
                        nextState: _.cloneDeep(o),
                      };
                    return (
                      (s.nextState.config.meta.username = t.username),
                      (s.nextState.config.meta.repositoryName =
                        t.repositoryName),
                      (s.nextState.config.meta.branch = t.branch),
                      (s.nextState.config.meta.cname = t.cname),
                      (s.nextState.requireInitilisation = !1),
                      r.a.startUpConfig(s).then(function (e) {
                        n(a.l, e.nextState);
                      })
                    );
                  }),
                  o()(n, a.j, function (e, t) {
                    var n = e.dispatch,
                      i = e.commit,
                      o = e.rootState,
                      s =
                        (e.state,
                        {
                          rootState: _.cloneDeep(o),
                          currentState: _.cloneDeep(o),
                          nextState: _.cloneDeep(o),
                        });
                    return (
                      console.log(s),
                      r.a.saveConfig(s).then(function (e) {
                        if (
                          (console.log("testsettesse", e),
                          i(a.j, e.nextState),
                          !t)
                        )
                          return n(a.k);
                      })
                    );
                  }),
                  o()(n, a.k, function (e) {
                    var t = e.dispatch,
                      n = e.commit,
                      i = e.rootState,
                      o =
                        (e.state,
                        {
                          rootState: _.cloneDeep(i),
                          currentState: _.cloneDeep(i),
                          nextState: _.cloneDeep(i),
                        });
                    return r.a
                      .saveConfigDone(o)
                      .then(function (e) {
                        n(a.k, e.nextState);
                      })
                      .then(function (e) {
                        return t("application:loaded");
                      })
                      .then(function (e) {
                        return t("application:notify", {
                          icon: "save",
                          header: "Settings saved",
                          message:
                            "Your settings have been saved and your blog was rebuild with success. ",
                          level: "success",
                        });
                      });
                  }),
                  o()(n, a.h, function (e, t) {
                    e.dispatch;
                    var n = e.commit;
                    e.rootState, e.state, n(a.h, t);
                  }),
                  o()(n, a.a, function (e) {
                    e.dispatch;
                    var t = e.commit;
                    e.rootState, e.state, t(a.a);
                  }),
                  o()(n, a.g, function (e) {
                    e.dispatch;
                    var t = e.commit;
                    e.rootState, e.state, t(a.g);
                  }),
                  o()(n, a.f, function (e) {
                    e.dispatch;
                    var t = e.commit;
                    e.rootState, e.state, t(a.f);
                  }),
                  n),
                getters: {
                  navigations: function (e) {
                    return e.routes.filter(function (e) {
                      return e.label;
                    });
                  },
                },
              };
              return (
                (e.nextState.stores.application = i),
                console.log(
                  "applicationPlugin - application:stores - return",
                  e
                ),
                e
              );
            }),
            e.on("application:prepare-config", function (e) {
              return (
                console.info("applicationPlugin - application:prepare-config"),
                console.log(
                  "applicationPlugin - application:prepare-config",
                  e
                ),
                (e.nextState.config.meta.cname =
                  e.payload.formData.get("application-cname")),
                console.log(
                  "applicationPlugin - application:prepare-config - return",
                  e
                ),
                e
              );
            }),
            e.on("application:save-config", function (e) {
              return (
                console.info("applicationPlugin - application:save-config"),
                console.log("applicationPlugin - application:save-config", e),
                console.log(
                  "applicationPlugin - application:save-config - return",
                  e
                ),
                e
              );
            }),
            {
              getName: function () {
                return "applicationPlugin";
              },
            }
          );
        });
      var i = n("bOdI"),
        o = n.n(i),
        r = n("RsIG"),
        a = n("X5n4"),
        s = n("kMyt"),
        c = { APPLICATION_PREPARE_CONFIG: a.i };
    },
    YLfZ: function (e, t, n) {
      "use strict";
      (t.a = function (e, t) {
        var n = e.options.data || x;
        if (!t && e.options.hasAsyncData) return;
        (e.options.hasAsyncData = !0),
          (e.options.data = function () {
            var i = n.call(this);
            return (
              this.$ssrContext && (t = this.$ssrContext.asyncData[e.cid]),
              m()({}, i, t)
            );
          }),
          e._Ctor && e._Ctor.options && (e._Ctor.options.data = e.options.data);
      }),
        (t.l = C),
        (t.e = y),
        (t.f = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return [].concat.apply(
            [],
            e.matched.map(function (e, n) {
              return h()(e.instances).map(function (i) {
                return t && t.push(n), e.instances[i];
              });
            })
          );
        }),
        (t.c = w),
        (t.k = P),
        n.d(t, "h", function () {
          return _;
        }),
        n.d(t, "m", function () {
          return R;
        }),
        (t.i = function e(t, n) {
          if (!t.length || n._redirected || n._errored) return d.a.resolve();
          return q(t[0], n).then(function () {
            return e(t.slice(1), n);
          });
        }),
        (t.j = q),
        (t.d = function (e, t) {
          var n = window.location.pathname;
          if ("hash" === t) return window.location.hash.replace(/^#\//, "");
          e && 0 === n.indexOf(e) && (n = n.slice(e.length));
          return (n || "/") + window.location.search + window.location.hash;
        }),
        (t.b = function (e, t) {
          return (function (e) {
            for (var t = new Array(e.length), n = 0; n < e.length; n++)
              "object" === a()(e[n]) &&
                (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
            return function (n, i) {
              for (
                var r = "",
                  a = n || {},
                  s = i || {},
                  c = s.pretty ? $ : encodeURIComponent,
                  u = 0;
                u < e.length;
                u++
              ) {
                var l = e[u];
                if ("string" != typeof l) {
                  var p,
                    d = a[l.name];
                  if (null == d) {
                    if (l.optional) {
                      l.partial && (r += l.prefix);
                      continue;
                    }
                    throw new TypeError(
                      'Expected "' + l.name + '" to be defined'
                    );
                  }
                  if (Array.isArray(d)) {
                    if (!l.repeat)
                      throw new TypeError(
                        'Expected "' +
                          l.name +
                          '" to not repeat, but received `' +
                          o()(d) +
                          "`"
                      );
                    if (0 === d.length) {
                      if (l.optional) continue;
                      throw new TypeError(
                        'Expected "' + l.name + '" to not be empty'
                      );
                    }
                    for (var f = 0; f < d.length; f++) {
                      if (((p = c(d[f])), !t[u].test(p)))
                        throw new TypeError(
                          'Expected all "' +
                            l.name +
                            '" to match "' +
                            l.pattern +
                            '", but received `' +
                            o()(p) +
                            "`"
                        );
                      r += (0 === f ? l.prefix : l.delimiter) + p;
                    }
                  } else {
                    if (
                      ((p = l.asterisk
                        ? encodeURI(d).replace(/[?#]/g, function (e) {
                            return (
                              "%" + e.charCodeAt(0).toString(16).toUpperCase()
                            );
                          })
                        : c(d)),
                      !t[u].test(p))
                    )
                      throw new TypeError(
                        'Expected "' +
                          l.name +
                          '" to match "' +
                          l.pattern +
                          '", but received "' +
                          p +
                          '"'
                      );
                    r += l.prefix + p;
                  }
                } else r += l;
              }
              return r;
            };
          })(
            (function (e, t) {
              var n,
                i = [],
                o = 0,
                r = 0,
                a = "",
                s = (t && t.delimiter) || "/";
              for (; null != (n = M.exec(e)); ) {
                var c = n[0],
                  u = n[1],
                  l = n.index;
                if (((a += e.slice(r, l)), (r = l + c.length), u)) a += u[1];
                else {
                  var p = e[r],
                    d = n[2],
                    f = n[3],
                    h = n[4],
                    g = n[5],
                    m = n[6],
                    v = n[7];
                  a && (i.push(a), (a = ""));
                  var b = null != d && null != p && p !== d,
                    x = "+" === m || "*" === m,
                    C = "?" === m || "*" === m,
                    y = n[2] || s,
                    w = h || g;
                  i.push({
                    name: f || o++,
                    prefix: d || "",
                    delimiter: y,
                    optional: C,
                    repeat: x,
                    partial: b,
                    asterisk: !!v,
                    pattern: w ? j(w) : v ? ".*" : "[^" + D(y) + "]+?",
                  });
                }
              }
              r < e.length && (a += e.substr(r));
              a && i.push(a);
              return i;
            })(e, t)
          );
        }),
        (t.g = function (e, t) {
          var n = {},
            i = m()({}, e, t);
          for (var o in i) String(e[o]) !== String(t[o]) && (n[o] = !0);
          return n;
        });
      var i = n("mvHQ"),
        o = n.n(i),
        r = n("pFYg"),
        a = n.n(r),
        s = n("Xxa5"),
        c = n.n(s),
        u = n("exGp"),
        l = n.n(u),
        p = n("//Fk"),
        d = n.n(p),
        f = n("fZjL"),
        h = n.n(f),
        g = n("Dd8w"),
        m = n.n(g),
        v = n("I3G/"),
        b = n.n(v),
        x = function () {
          return {};
        };
      function C(e) {
        return e.options && e._Ctor === e
          ? e
          : (e.options
              ? ((e._Ctor = e), (e.extendOptions = e.options))
              : ((e = b.a.extend(e))._Ctor = e),
            !e.options.name &&
              e.options.__file &&
              (e.options.name = e.options.__file),
            e);
      }
      function y(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return [].concat.apply(
          [],
          e.matched.map(function (e, n) {
            return h()(e.components).map(function (i) {
              return t && t.push(n), e.components[i];
            });
          })
        );
      }
      function w(e, t) {
        return Array.prototype.concat.apply(
          [],
          e.matched.map(function (e, n) {
            return h()(e.components).map(function (i) {
              return t(e.components[i], e.instances[i], e, i, n);
            });
          })
        );
      }
      function P(e) {
        var t,
          n = this;
        return d.a.all(
          w(
            e,
            ((t = l()(
              c.a.mark(function e(t, i, o, r) {
                return c.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if ("function" != typeof t || t.options) {
                            e.next = 4;
                            break;
                          }
                          return (e.next = 3), t();
                        case 3:
                          t = e.sent;
                        case 4:
                          return e.abrupt("return", (o.components[r] = C(t)));
                        case 5:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  n
                );
              })
            )),
            function (e, n, i, o) {
              return t.apply(this, arguments);
            })
          )
        );
      }
      (window._nuxtReadyCbs = []),
        (window.onNuxtReady = function (e) {
          window._nuxtReadyCbs.push(e);
        });
      var k,
        S,
        _ =
          ((k = l()(
            c.a.mark(function e(t) {
              return c.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), P(t);
                      case 2:
                        return e.abrupt(
                          "return",
                          m()({}, t, {
                            meta: y(t).map(function (e) {
                              return e.options.meta || {};
                            }),
                          })
                        );
                      case 3:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          )),
          function (e) {
            return k.apply(this, arguments);
          }),
        R =
          ((S = l()(
            c.a.mark(function e(t, n) {
              return c.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if ((n.to ? n.to : n.route, t.context)) {
                          e.next = 14;
                          break;
                        }
                        (e.t0 = !0),
                          (e.t1 = t),
                          (e.t2 = t.store),
                          (e.t3 = n.payload),
                          (e.t4 = n.error),
                          (e.t5 = {
                            hubpressVersion: "1.0.0",
                            baseUrl: "http://localhost:3000",
                          }),
                          (t.context = {
                            get isServer() {
                              return (
                                console.warn(
                                  "context.isServer has been deprecated, please use process.server instead."
                                ),
                                !1
                              );
                            },
                            get isClient() {
                              return (
                                console.warn(
                                  "context.isClient has been deprecated, please use process.client instead."
                                ),
                                !0
                              );
                            },
                            isStatic: e.t0,
                            isDev: !1,
                            isHMR: !1,
                            app: e.t1,
                            store: e.t2,
                            payload: e.t3,
                            error: e.t4,
                            base: "..",
                            env: e.t5,
                          }),
                          n.req && (t.context.req = n.req),
                          n.res && (t.context.res = n.res),
                          (t.context.redirect = function (e, n, i) {
                            if (e) {
                              t.context._redirected = !0;
                              var o = void 0 === n ? "undefined" : a()(n);
                              if (
                                ("number" == typeof e ||
                                  ("undefined" !== o && "object" !== o) ||
                                  ((i = n || {}),
                                  (o =
                                    void 0 === (n = e) ? "undefined" : a()(n)),
                                  (e = 302)),
                                "object" === o &&
                                  (n = t.router.resolve(n).href),
                                !/(^[.]{1,2}\/)|(^\/(?!\/))/.test(n))
                              )
                                throw (
                                  ((n = L(n, i)),
                                  window.location.replace(n),
                                  new Error("ERR_REDIRECT"))
                                );
                              t.context.next({ path: n, query: i, status: e });
                            }
                          }),
                          (t.context.nuxtState = window.__NUXT__);
                      case 14:
                        if (
                          ((t.context.next = n.next),
                          (t.context._redirected = !1),
                          (t.context._errored = !1),
                          (t.context.isHMR = !!n.isHMR),
                          !n.route)
                        ) {
                          e.next = 22;
                          break;
                        }
                        return (e.next = 21), _(n.route);
                      case 21:
                        t.context.route = e.sent;
                      case 22:
                        if (
                          ((t.context.params = t.context.route.params || {}),
                          (t.context.query = t.context.route.query || {}),
                          !n.from)
                        ) {
                          e.next = 28;
                          break;
                        }
                        return (e.next = 27), _(n.from);
                      case 27:
                        t.context.from = e.sent;
                      case 28:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          )),
          function (e, t) {
            return S.apply(this, arguments);
          });
      function q(e, t) {
        var n = void 0;
        return (
          ((n =
            2 === e.length
              ? new d.a(function (n) {
                  e(t, function (e, i) {
                    e && t.error(e), n((i = i || {}));
                  });
                })
              : e(t)) &&
            (n instanceof d.a || "function" == typeof n.then)) ||
            (n = d.a.resolve(n)),
          n
        );
      }
      var M = new RegExp(
        [
          "(\\\\.)",
          "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))",
        ].join("|"),
        "g"
      );
      function $(e) {
        return encodeURI(e).replace(/[\/?#]/g, function (e) {
          return "%" + e.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function D(e) {
        return e.replace(/([.+*?=^!:()[\]|\/\\])/g, "\\$1");
      }
      function j(e) {
        return e.replace(/([=!:$\/()])/g, "\\$1");
      }
      function L(e, t) {
        var n = void 0,
          i = e.indexOf("://");
        -1 !== i
          ? ((n = e.substring(0, i)), (e = e.substring(i + 3)))
          : 0 === e.indexOf("//") && (e = e.substring(2));
        var r = e.split("/"),
          a = (n ? n + "://" : "//") + r.shift(),
          s = r.filter(Boolean).join("/"),
          c = void 0;
        return (
          2 === (r = s.split("#")).length && ((s = r[0]), (c = r[1])),
          (a += s ? "/" + s : ""),
          t &&
            "{}" !== o()(t) &&
            (a +=
              (2 === e.split("?").length ? "&" : "?") +
              (function (e) {
                return h()(e)
                  .sort()
                  .map(function (t) {
                    var n = e[t];
                    return null == n
                      ? ""
                      : Array.isArray(n)
                      ? n
                          .slice()
                          .map(function (e) {
                            return [t, "=", e].join("");
                          })
                          .join("&")
                      : t + "=" + n;
                  })
                  .filter(Boolean)
                  .join("&");
              })(t)),
          (a += c ? "#" + c : "")
        );
      }
    },
    YMuy: function (e, t, n) {
      "use strict";
      var i = n("6Ndi"),
        o = n("PJh5"),
        r = n.n(o);
      function a(e) {
        return i.a
          .fireRequestRemoteSynchronization(e)
          .then(function (e) {
            return i.a.fireReceiveRemoteSynchronization(e);
          })
          .then(function (e) {
            return i.a.fireRequestRenderingDocuments(e);
          })
          .then(function (e) {
            return i.a.fireReceiveRenderingDocuments(e);
          })
          .then(function (e) {
            return i.a.fireRequestLocalSynchronization(e);
          })
          .then(function (e) {
            return i.a.fireReceiveLocalSynchronization(e);
          })
          .then(function (e) {
            return i.a.fireRequestLocalPosts(e);
          })
          .then(function (e) {
            return i.a.fireReceiveLocalPosts(e);
          })
          .then(function (e) {
            return localStorage.setItem("hubpress:sync", r()().format()), e;
          });
      }
      t.a = {
        initialize: function (e) {
          return i.a
            .fireRequestTheme(e)
            .then(function (e) {
              return i.a.fireReceiveTheme(e);
            })
            .then(function (e) {
              return localStorage.getItem("hubpress:sync")
                ? i.a.fireRequestLocalPosts(e).then(function (e) {
                    return i.a.fireReceiveLocalPosts(e);
                  })
                : a(e);
            });
        },
        synchronize: a,
      };
    },
    "bN/m": function (e, t, n) {
      "use strict";
      function i(e, t) {
        var n = void 0;
        return (
          e.cname && "" !== e.cname
            ? (n = (!1 === t ? "" : "http:") + "//" + e.cname)
            : ((n =
                (!1 === t ? "" : "https:") + "//" + e.username + ".github.io"),
              "master" !== e.branch && (n = n + "/" + e.repositoryName)),
          n
        );
      }
      function o(e, t) {
        var n = e.replace(
          /([\d]{4})-([\d]{2})-([\d]{2})-([\w-]*)\.adoc/,
          "/$1/$2/$3/$4.html"
        );
        return "page" === t && (n = e.replace(/([\w-]*)\.adoc/, "/$1.html")), n;
      }
      function r(e, t) {
        var n = e.replace(
          /([\d]{4})-([\d]{2})-([\d]{2})-([\w-]*)\.adoc/,
          "$1/$2/$3/$4.html"
        );
        return "page" === t && (n = e.replace(/([\w-]*)\.adoc/, "$1.html")), n;
      }
      function a(e) {
        return e.match(/([\d]{4})-([\d]{2})-([\d]{2})-([\w-]*)\.adoc/)
          ? "post"
          : "page";
      }
      t.a = function (e) {
        return {
          site: i(e.meta),
          hubpress: (function (e, t) {
            var n = t.protocol + "//" + t.host;
            if ("localhost" === t.hostname) return n;
            t.host === e.username + ".github.io" ||
            t.host === e.username + ".github.com"
              ? "master" !== e.branch && (n = n + "/" + e.repositoryName)
              : "master" === e.branch ||
                (e.cname && "" !== e.cname) ||
                (n = n + "/" + e.repositoryName);
            return n;
          })(e.meta, window.location),
          theme: i(e.meta, !1) + "/themes/" + e.theme.name,
          images: i(e.meta) + "/images",
          getContentUrl: o,
          getContentGhPath: r,
          getContentType: a,
          getPostUrl: function (e) {
            return e.replace(
              /([\d]{4})-([\d]{2})-([\d]{2})-([\w-]*)\.adoc/,
              "/$1/$2/$3/$4.html"
            );
          },
          getPostGhPath: function (e) {
            return e.replace(
              /([\d]{4})-([\d]{2})-([\d]{2})-([\w-]*)\.adoc/,
              "$1/$2/$3/$4.html"
            );
          },
          getPageUrl: function (e) {
            return e.replace(/([\w-]*)\.adoc/, "/$1.html");
          },
          getPageGhPath: function (e) {
            return e.replace(/([\w-]*)\.adoc/, "$1.html");
          },
          getSiteUrl: i,
        };
      };
    },
    bxJ0: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("application:request-config", function (e) {
          return (
            console.info("githubPlugin - application:request-config"),
            console.log("githubPlugin - application:request-config", e),
            l()("config.json?dt=" + Date.now())
              .then(function (e) {
                return e.json();
              })
              .then(function (t) {
                return (
                  (e.nextState.config = a()({}, e.nextState.config, t)),
                  (e.nextState.config.theme.name =
                    e.nextState.config.theme.name.toLowerCase()),
                  e
                );
              })
          );
        }),
          e.on("application:receive-config", function (e) {
            console.info("githubPlugin - application:receive-config"),
              console.log("githubPlugin - application:receive-config", e);
            var t = Object(y.a)(e.nextState.config);
            return (
              (e.nextState.config = a()({}, e.nextState.config, { urls: t })), e
            );
          }),
          e.on("requestAuthentication", function (e) {
            return (
              console.info("githubPlugin - requestAuthentication"),
              console.log("githubPlugin - requestAuthentication", e),
              (function (e) {
                console.log("githubPlugin - login", e);
                var t = m.a.defer(),
                  n = e.nextState.credentials,
                  i = e.rootState.application.config.meta,
                  o = (q = new h.a({
                    auth: "basic",
                    username: n.email,
                    password: n.password,
                    twoFactorCode: n.twoFactorCode,
                  })).getRepo(i.username, i.repositoryName),
                  r = q.getAuthorization(),
                  a = q.getUser(),
                  s = void 0,
                  c = void 0;
                return (
                  (function (e) {
                    var t = m.a.defer();
                    return (
                      e.getDetails(function (e, n) {
                        e ? t.reject(e) : t.resolve(n);
                      }),
                      t.promise
                    );
                  })(o)
                    .then(function (e) {
                      s = e;
                    })
                    .then(S(a))
                    .then(function (e) {
                      return (
                        (c = e),
                        (function (e) {
                          var t = m.a.defer();
                          return (
                            console.log("getAuthorizations", e),
                            e.listAuthorizations({}, function (e, n) {
                              e
                                ? t.reject(e)
                                : (console.log("getAuthorizations list", n),
                                  t.resolve(n));
                            }),
                            t.promise
                          );
                        })(r)
                      );
                    })
                    .then(function (e) {
                      return (function (e, t, n) {
                        var i = m.a.defer(),
                          o = -1,
                          r = _(e);
                        return (
                          t.forEach(function (e) {
                            e.note === r && (o = e.id);
                          }),
                          -1 !== o
                            ? n.deleteAuthorization(o, function (e, t) {
                                e ? i.reject(e) : i.resolve();
                              })
                            : i.resolve(),
                          i.promise
                        );
                      })(i.repositoryName, e, r);
                    })
                    .then(function () {
                      return R(i.repositoryName, r);
                    })
                    .then(function (e) {
                      (q = new h.a({ auth: "oauth", token: e.token })),
                        t.resolve({
                          isAuthenticated: !0,
                          credentials: { token: e.token },
                          permissions: s.permissions,
                          userInformations: c,
                        });
                    })
                    .catch(function (e) {
                      console.error(
                        "githubPlugin - login error",
                        e,
                        e.response
                      );
                      var n,
                        o = { type: "error", title: "Authentication" };
                      e.response &&
                        (n =
                          "required" ===
                          (
                            (e.response.headers &&
                              e.response.headers["x-github-otp"]) ||
                            ""
                          ).split(";")[0]),
                        n
                          ? (R(i.repositoryName, r),
                            console.log("githubPlugin - OTP required : ", n),
                            (o.type = "warning"),
                            (o.content =
                              "A two-factor authentication code is needed."),
                            (o.otp = !0),
                            t.resolve({
                              isAuthenticated: !1,
                              isTwoFactorCodeRequired: !0,
                            }))
                          : (console.error("githubPlugin - login error", e),
                            t.reject({
                              error: {
                                code: e.error,
                                message:
                                  "Unable to authenticate, check your credentials.",
                              },
                            }));
                    }),
                  t.promise
                );
              })(e).then(function (t) {
                var n = a()({}, e.nextState.credentials, t.credentials);
                return (
                  (e.nextState = a()({}, e.nextState, t, { credentials: n })), e
                );
              })
            );
          }),
          e.on("receiveSavedAuth", function (e) {
            return (
              console.info("githubPlugin - receiveSavedAuth"),
              console.log("githubPlugin - receiveSavedAuth", e),
              e.nextState.authentication.isAuthenticated &&
                (q = new h.a({
                  auth: "oauth",
                  token: e.nextState.authentication.credentials.token,
                })),
              e
            );
          }),
          e.on("hubpress:request-remote-synchronization", function (e) {
            return (
              console.info(
                "githubPlugin - hubpress:request-remote-synchronization"
              ),
              console.log(
                "githubPlugin - hubpress:request-remote-synchronization",
                e
              ),
              e.rootState.authentication.isAuthenticated
                ? (function (e) {
                    var t = e.application.config;
                    console.log("Get posts", t);
                    var n = t.meta,
                      i = q.getRepo(n.username, n.repositoryName);
                    return (function (e, t) {
                      var n = m.a.defer();
                      return (
                        e.getContents(t.meta.branch, "", !0, function (e, t) {
                          if (e) n.reject(e);
                          else {
                            var i = void 0;
                            t.forEach(function (e) {
                              "_posts" === e.name && (i = e.sha);
                            }),
                              n.resolve(i);
                          }
                        }),
                        n.promise
                      );
                    })(i, t)
                      .then(function (e) {
                        return (function (e, t, n) {
                          var i = void 0;
                          if (n === localStorage.postsSha)
                            i = m.a.fcall(function () {
                              return [];
                            });
                          else {
                            var o = m.a.defer();
                            e.getContents(
                              t.meta.branch,
                              "_posts",
                              !0,
                              function (e, t) {
                                e ? o.reject(e) : o.resolve(t);
                              }
                            ),
                              (i = o.promise);
                          }
                          return i;
                        })(i, t, e);
                      })
                      .then(function (e) {
                        return e.map(function (e) {
                          return b.a.pick(e, ["name", "path", "sha", "size"]);
                        });
                      })
                      .then(function (e) {
                        return (function (e, t, n) {
                          var i = b.a.compact(n).map(function (e) {
                            return (function (e, t) {
                              var n = m.a.defer(),
                                i = e.meta,
                                o = q.getRepo(i.username, i.repositoryName),
                                r = e.urls.getContentType(t.name);
                              return (
                                o.getSha(
                                  e.meta.branch,
                                  e.urls.getContentGhPath(t.name, r),
                                  function (e, i) {
                                    if (
                                      e &&
                                      e.response &&
                                      404 !== e.response.status
                                    )
                                      n.reject(e);
                                    else {
                                      var o = i ? 1 : 0,
                                        r = a()({}, t, { published: o });
                                      n.resolve(r);
                                    }
                                  }
                                ),
                                n.promise
                              );
                            })(t, e);
                          });
                          return m.a.all(i);
                        })(0, t, e);
                      })
                      .then(function (n) {
                        return (function (e, t, n, i) {
                          var o = n.map(function (e) {
                            return M(t, e, i);
                          });
                          return m.a.all(o);
                        })(0, t, n, e.authentication.userInformations);
                      })
                      .then(function (e) {
                        return (function (e, t, n) {
                          var i = [];
                          return (
                            n.forEach(function (n) {
                              var o = m.a.defer();
                              i.push(o.promise),
                                e.getContents(
                                  t.meta.branch,
                                  n.path,
                                  !0,
                                  function (e, t) {
                                    var i;
                                    e
                                      ? o.reject(e)
                                      : ((i = a()({}, n, { content: t })),
                                        o.resolve(i));
                                  }
                                );
                            }),
                            m.a.all(i)
                          );
                        })(i, t, e);
                      });
                  })(e.rootState).then(function (t) {
                    return (
                      (e.nextState = a()({}, e.nextState, { posts: t })), e
                    );
                  })
                : e
            );
          }),
          e.on("requestSaveRemotePost", function (e) {
            console.info("githubPlugin - requestSaveRemotePost"),
              console.log("githubPlugin - requestSaveRemotePost", e);
            var t = e.rootState.application.config,
              n = e.nextState.post;
            return (function (e, t) {
              var n = e.meta,
                i = q.getRepo(n.username, n.repositoryName),
                o = void 0;
              if (t.original && t.name !== t.original.name) {
                var r = m.a.defer();
                o = r.promise;
                var a = e.meta.branch,
                  s = "_posts/" + t.original.name,
                  c = "_posts/" + t.name;
                i.move(a, s, c, function (n, o) {
                  if (n) r.reject(n);
                  else if (t.published) {
                    var s = e.urls.getContentGhPath(
                      t.original.name,
                      t.original.type
                    );
                    (function (e, t, n) {
                      return (function (e, t, n) {
                        var i = m.a.defer();
                        return (
                          e.deleteFile(t, n, function (e, t) {
                            e
                              ? i.reject(e)
                              : (console.error(t),
                                (k = t.commit),
                                i.resolve(t));
                          }),
                          i.promise
                        );
                      })(e, t, n);
                    })(i, a, s)
                      .then(function (e) {
                        r.resolve({ post: t, sha: e });
                      })
                      .catch(function (e) {
                        r.reject(e);
                      })
                      .done();
                  } else r.resolve({ post: t, sha: o });
                });
              } else o = m()({ post: t });
              return o;
            })(t, n)
              .then(function (e) {
                return (function (e, t) {
                  console.log("Write post", e, t);
                  var n = e.meta,
                    i = q.getRepo(n.username, n.repositoryName),
                    o = n.branch,
                    r = "_posts/" + t.name,
                    a = "Update " + t.name,
                    s = m.a.defer();
                  return (
                    i.writeFile(o, r, t.content, a, function (n, i) {
                      n
                        ? s.reject(n)
                        : ((t.original = b.a.omit(t, ["original"])),
                          (t.original.url = e.urls.getContentUrl(
                            t.original.name,
                            t.original.type
                          )),
                          (t.original.path = "_posts/" + t.original.name),
                          (t.original.sha = i),
                          (k = i.commit),
                          console.info("Update lastCacheCommit", k),
                          s.resolve(t));
                    }),
                    s.promise
                  );
                })(t, e.post);
              })
              .then(function (n) {
                return M(t, n, e.rootState.authentication.userInformations);
              })
              .then(function (t) {
                return (e.nextState.post = t), e;
              });
          }),
          e.on("requestSaveRemotePublishedElements", function (e) {
            console.info("githubPlugin - requestSaveRemotePublishedElements"),
              console.log(
                "githubPlugin - requestSaveRemotePublishedElements",
                e
              );
            var t = e.rootState.application.config.meta,
              n = q.getRepo(t.username, t.repositoryName),
              i = e.nextState.elementsToPublish.length,
              o = b.a.chunk(e.nextState.elementsToPublish, P);
            console.log("Writeall", e.nextState.elementsToPublish);
            var r = m.a.defer();
            return (
              n.getBranch(t.branch, function (a, s) {
                if (a) {
                  var c = m.a.defer();
                  return (r = c.promise), c.reject(a);
                }
                var u = 0,
                  l = o.reduce(
                    function (e, o) {
                      return e.then(function (e) {
                        var r = m.a.defer(),
                          a = o.map(function (e) {
                            return {
                              path: e.path,
                              mode: "100644",
                              type: "blob",
                              content: e.content,
                            };
                          });
                        return (
                          n.createTree(a, e, function (a, s) {
                            if (a) return r.reject(a);
                            n.commit(
                              e,
                              s.sha,
                              "Published " +
                                (u + o.length) +
                                "/" +
                                i +
                                " elements",
                              function (e, i) {
                                if (e) return r.reject(e);
                                (u += o.length),
                                  (k = i),
                                  n.updateHead(
                                    "heads/" + t.branch,
                                    i.sha,
                                    !1,
                                    function (e, t) {
                                      if ((console.log("updateHead", e, t), e))
                                        return r.reject(e);
                                      r.resolve(i.sha);
                                    }
                                  );
                              }
                            );
                          }),
                          r.promise
                        );
                      });
                    },
                    m()(
                      (function (e, t) {
                        if ((console.error(e, t), !t)) return e.sha;
                        var n = C()(e.committer.date);
                        return C()(t.committer.date).isAfter(n) ? t.sha : e.sha;
                      })(
                        {
                          committer: s.commit.commit.committer,
                          sha: s.commit.sha,
                        },
                        k
                      )
                    )
                  );
                l.then(function (t) {
                  r.resolve(e);
                }).catch(function (e) {
                  r.reject(e);
                });
              }),
              r.promise
            );
          }),
          e.on("requestDeleteRemotePost", function (e) {
            console.info("githubPlugin - requestDeleteRemotePost"),
              console.log("githubPlugin - requestDeleteRemotePost", e);
            var t = m.a.defer(),
              n = e.rootState.application.config,
              i = n.meta,
              o = q.getRepo(i.username, i.repositoryName),
              r = e.nextState.post.original.path;
            return (
              o
                .deleteFile(i.branch, r, function (n, i) {
                  n && n.response && 404 !== n.response.status
                    ? t.reject(n)
                    : (console.error("requestDeleteRemotePost", i),
                      (k = i.commit),
                      t.resolve(e));
                })
                .catch(function (n) {
                  n && n.response && 404 === n.response.status && t.resolve(e);
                }),
              t.promise
            );
          }),
          e.on("requestDeleteRemotePublishedPost", function (e) {
            console.info("githubPlugin - requestDeleteRemotePublishedPost"),
              console.log("githubPlugin - requestDeleteRemotePublishedPost", e);
            var t = m.a.defer(),
              n = e.rootState.application.config,
              i = n.meta,
              o = q.getRepo(i.username, i.repositoryName),
              r = n.urls.getContentGhPath(
                e.nextState.post.original.name,
                e.nextState.post.original.type
              );
            return (
              o.deleteFile(i.branch, r, function (n, i) {
                n
                  ? t.reject(n)
                  : (console.error("requestDeleteRemotePublishedPost", i),
                    (k = i.commit),
                    t.resolve(e));
              }),
              t.promise
            );
          }),
          e.on("application:request-save-config", function (e) {
            console.info("githubPlugin - application:request-save-config"),
              console.log("githubPlugin - application:request-save-config", e);
            var t = e.nextState.application;
            return (function (e) {
              console.log("Write config", e);
              var t = m.a.defer(),
                n = e.meta,
                i = q.getRepo(n.username, n.repositoryName),
                r = n.branch;
              return (
                i.writeFile(
                  r,
                  "hubpress/config.json",
                  o()(e, null, 2),
                  "Update configuration file",
                  function (e, n) {
                    e
                      ? t.reject(e)
                      : ((k = n.commit),
                        console.info("Update lastCacheCommit", k),
                        t.resolve(n));
                  }
                ),
                t.promise
              );
            })(t.config)
              .then(function (e) {
                return (function (e) {
                  console.log("Github manageCname - ", e);
                  var t = e.meta,
                    n = q.getRepo(t.username, t.repositoryName),
                    i = m.a.defer();
                  t.cname && "" !== t.cname
                    ? (console.info(
                        "SettingsService - saveAndPublish save CNAME"
                      ),
                      n.writeFile(
                        t.branch,
                        "CNAME",
                        t.cname,
                        "Update CNAME with " + t.cname,
                        function (e, t) {
                          e
                            ? i.reject(e)
                            : ((k = t.commit),
                              console.info("Update lastCacheCommit", k),
                              i.resolve(t));
                        }
                      ))
                    : (console.info(
                        "SettingsService - saveAndPublish delete CNAME"
                      ),
                      n
                        .deleteFile(t.branch, "CNAME", function (e, t) {
                          e && "not found" !== e ? i.reject(e) : i.resolve(t);
                        })
                        .then(function (e) {
                          console.log("SHA after delete", e), i.resolve(e);
                        })
                        .catch(function (e) {
                          404 !== e.response.status ? i.reject(e) : i.resolve();
                        }));
                  return i.promise;
                })(t.config);
              })
              .then(function (t) {
                return e;
              });
          }),
          e.on("receiveRenderingPost", function (e) {
            return (
              console.info("githubPlugin - receiveRenderingPost"),
              console.log("githubPlugin - receiveRenderingPost", e),
              e
            );
          }),
          e.on("application:initialize-plugins", function (e) {
            console.info("githubPlugin - application:initialize-plugins"),
              console.log("githubPlugin - application:initialize-plugins", e);
            var t =
              "put your repository name here" ===
                e.rootState.application.config.meta.repositoryName ||
              "put your username here" ===
                e.rootState.application.config.meta.username;
            return (
              (e.nextState.application.requireInitilisation = t),
              (e.nextState.application.config.initialisationConfigComponent =
                w.a),
              e
            );
          });
      };
      var i = n("mvHQ"),
        o = n.n(i),
        r = n("woOf"),
        a = n.n(r),
        s = n("6ltY"),
        c = n.n(s),
        u = n("j9g7"),
        l = n.n(u),
        p = n("n+xr"),
        d = n.n(p),
        f = n("73D8"),
        h = n.n(f),
        g = n("/Luh"),
        m = n.n(g),
        v = n("M4fF"),
        b = n.n(v),
        x = n("PJh5"),
        C = n.n(x),
        y = n("bN/m"),
        w = n("IBrK"),
        P = 50,
        k = null;
      function S(e) {
        return function () {
          var t = m.a.defer();
          return (
            e.getProfile(function (e, n) {
              e
                ? t.reject(e)
                : t.resolve(
                    b.a.pick(n, [
                      "login",
                      "id",
                      "name",
                      "location",
                      "blog",
                      "avatar_url",
                      "bio",
                    ])
                  );
            }),
            t.promise
          );
        };
      }
      function _(e) {
        return d()(e + "-" + c.a.name + "-" + c.a.os);
      }
      function R(e, t) {
        var n = m.a.defer(),
          i = { scopes: ["public_repo"], note: _(e) };
        return (
          t.createAuthorization(i, function (e, t) {
            e ? n.reject(e) : n.resolve(t);
          }),
          n.promise
        );
      }
      var q = void 0;
      function M(e, t, n) {
        var i = m.a.defer(),
          o = e.meta,
          r = q.getRepo(o.username, o.repositoryName);
        return (
          console.log("getPostAuthor", t),
          r.listCommits(
            {
              sha: e.meta.branch,
              path: (t.original && t.original.path) || t.path,
            },
            function (e, o) {
              if (e && 404 !== e.error) i.reject(e);
              else {
                var r = o[o.length - 1].author;
                if (r && r.login !== n.login) {
                  S(q.getUser(r.login))()
                    .then(function (e) {
                      r = a()({}, e);
                      var n = a()({}, t, { author: r });
                      i.resolve(n);
                    })
                    .catch(function (e) {
                      return i.reject(e);
                    });
                } else {
                  r = a()({}, n);
                  var s = a()({}, t, { author: r });
                  i.resolve(s);
                }
              }
            }
          ),
          i.promise
        );
      }
    },
    cOI0: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        '.CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5)}.cm-animate-fat-cursor,.cm-fat-cursor-mark{-webkit-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;background-color:#7e7}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:blue}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;-webkit-font-feature-settings:"calt";font-feature-settings:"calt";font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-webkit-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:""}span.CodeMirror-selectedtext{background:none}',
        "",
      ]);
    },
    cmzl: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this.$createElement;
          return (this._self._c || e)("div", {
            staticClass: "nuxt-progress",
            style: {
              width: this.percent + "%",
              height: this.height,
              "background-color": this.canSuccess
                ? this.color
                : this.failedColor,
              opacity: this.show ? 1 : 0,
            },
          });
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    ct3O: function (e, t, n) {
      "use strict";
      var i = n("FIB3"),
        o = n("FdPX");
      var r = function (e) {
          n("wGIl");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    "d+j1": function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".CodeMirror-sizer{padding-top:2em;font-size:18.285px;font-size:1.14285714rem;max-width:750px!important;line-height:1.5;display:block}@media only screen and (max-width:767px){.CodeMirror-sizer{width:auto!important;margin-left:1em!important;margin-right:1em!important}.item.html-preview{display:none!important}}@media only screen and (max-width:992px){.item.preview-resize{display:none!important}}@media only screen and (min-width:768px){.CodeMirror-sizer{margin-left:auto!important;margin-right:auto!important}}.CodeMirror-gutter-wrapper{display:none!important}.cm-header{font-size:1.8em;font-weight:700}.cm-header-2{font-size:1.6em;font-weight:700}.cm-header-3{font-size:1.45em;font-weight:700}.cm-header-4{font-size:1.3em;font-weight:700}.cm-header-5{font-size:1.15em;font-weight:700}.cm-header-6{font-size:1.05em;font-weight:700}.post-editor{padding-top:47px}.CodeMirror,.post-container,.post-editor,.post-editor .ui.grid,.post-editor .ui.grid .column{height:100%;min-height:100%}.post-editor .ui.grid>.row{padding-top:0;padding-bottom:0}.post-editor .ui.grid.light>.row{background-color:#f5f5f5;color:#202020}.post-editor .ui.grid.light>.row .ui.header{color:#202020}.post-editor .ui.grid.light>.row a{color:#aa759f}.post-editor .ui.grid.dark>.row,.post-editor .ui.grid.dark>.row .ui.header{background-color:#3f3f3f;color:#dcdccc}.post-editor .ui.grid.dark>.row .ui.header{color:#dcdccc}.post-editor .ui.grid.dark>.row a{color:#dcdcaa}.post-editor .ui.grid{padding-top:0;padding-bottom:0;margin:0}.post-editor .ui.grid .column{padding-top:0;margin-top:0;padding-bottom:0;margin-bottom:0}.vue-codemirror.container{min-height:100%;height:100%}#asciidoc-content,#asciidoc-preview{height:calc(100vh - 47px);min-height:calc(100vh - 47px)}#asciidoc-content.is-hidden{display:none}#asciidoc-preview{overflow-y:auto;padding-top:2em;font-size:1.2em;font-family:Menlo,Monaco,Consolas,Courier New,monospace;word-wrap:break-word}#asciidoc-preview.is-iframe{padding:0}#asciidoc-preview>div{max-width:750px!important;margin:auto}#asciidoc-preview.is-iframe>div{min-width:100%;margin:auto}#asciidoc-preview.is-fullscreen{width:100%!important}#asciidoc-preview>div .ui.header{font-family:Menlo,Monaco,Consolas,Courier New,monospace}#asciidoc-preview .content pre{background-color:#dcdccc;color:#2e2e2e;padding:10px;border-radius:5px;overflow:auto}#asciidoc-preview .paragraph{padding:.75em 0}#asciidoc-preview img{width:100%;max-width:100%}@media screen and (max-width:992px){#asciidoc-content{display:block}#asciidoc-content.is-preview-visible,#asciidoc-preview{display:none}#asciidoc-preview.is-preview-visible{display:block}}.item .ui.icon .rocket.unpublish{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.cm-s-zenburn.CodeMirror .CodeMirror-gutters{background:#3f3f3f!important}.cm-s-zenburn.CodeMirror .CodeMirror-foldgutter-open,.CodeMirror-foldgutter-folded{color:#999}.cm-s-zenburn.CodeMirror .CodeMirror-cursor{border-left:1px solid #fff}.cm-s-zenburn.CodeMirror{background-color:#3f3f3f;color:#dcdccc}.cm-s-zenburn.CodeMirror span.cm-builtin{color:#dcdccc;font-weight:700}.cm-s-zenburn.CodeMirror span.cm-comment{color:#7f9f7f}.cm-s-zenburn.CodeMirror span.cm-keyword{color:#f0dfaf;font-weight:700}.cm-s-zenburn.CodeMirror span.cm-atom{color:#bfebbf}.cm-s-zenburn.CodeMirror span.cm-def{color:#dcdccc}.cm-s-zenburn.CodeMirror span.cm-variable{color:#dfaf8f}.cm-s-zenburn.CodeMirror span.cm-variable-2{color:#dcdccc}.cm-s-zenburn.CodeMirror span.cm-string,.cm-s-zenburn.CodeMirror span.cm-string-2{color:#cc9393}.cm-s-zenburn.CodeMirror span.cm-number{color:#dcdccc}.cm-s-zenburn.CodeMirror span.cm-tag{color:#93e0e3}.cm-s-zenburn.CodeMirror span.cm-attribute,.cm-s-zenburn.CodeMirror span.cm-property{color:#dfaf8f}.cm-s-zenburn.CodeMirror span.cm-qualifier{color:#7cb8bb}.cm-s-zenburn.CodeMirror span.cm-meta{color:#f0dfaf}.cm-s-zenburn.CodeMirror span.cm-header,.cm-s-zenburn.CodeMirror span.cm-operator{color:#f0efd0}.cm-s-zenburn.CodeMirror span.CodeMirror-matchingbracket{-webkit-box-sizing:border-box;box-sizing:border-box;background:transparent;border-bottom:1px solid}.cm-s-zenburn.CodeMirror span.CodeMirror-nonmatchingbracket{border-bottom:1px solid;background:none}.cm-s-zenburn.CodeMirror .CodeMirror-activeline,.cm-s-zenburn.CodeMirror .CodeMirror-activeline-background{background:#000}.cm-s-zenburn.CodeMirror div.CodeMirror-selected{background:#545454}.cm-s-zenburn.CodeMirror .CodeMirror-focused div.CodeMirror-selected{background:#4f4f4f}.cm-s-base16-light.CodeMirror{background:#f5f5f5;color:#202020}.cm-s-base16-light.CodeMirror div.CodeMirror-selected{background:#e0e0e0}.cm-s-base16-light.CodeMirror .CodeMirror-line::selection,.cm-s-base16-light.CodeMirror .CodeMirror-line>span::selection,.cm-s-base16-light.CodeMirror .CodeMirror-line>span>span::selection{background:#e0e0e0}.cm-s-base16-light.CodeMirror .CodeMirror-line::-moz-selection,.cm-s-base16-light.CodeMirror .CodeMirror-line>span::-moz-selection,.cm-s-base16-light.CodeMirror .CodeMirror-line>span>span::-moz-selection{background:#e0e0e0}.cm-s-base16-light.CodeMirror .CodeMirror-gutters{background:#f5f5f5;border-right:0}.cm-s-base16-light.CodeMirror .CodeMirror-guttermarker{color:#ac4142}.cm-s-base16-light.CodeMirror .CodeMirror-guttermarker-subtle,.cm-s-base16-light.CodeMirror .CodeMirror-linenumber{color:#b0b0b0}.cm-s-base16-light.CodeMirror .CodeMirror-cursor{border-left:1px solid #505050}.cm-s-base16-light.CodeMirror span.cm-comment{color:#8f5536}.cm-s-base16-light.CodeMirror span.cm-atom,.cm-s-base16-light.CodeMirror span.cm-number{color:#aa759f}.cm-s-base16-light.CodeMirror span.cm-attribute,.cm-s-base16-light.CodeMirror span.cm-property{color:#90a959}.cm-s-base16-light.CodeMirror span.cm-keyword{color:#ac4142}.cm-s-base16-light.CodeMirror span.cm-string{color:#f4bf75}.cm-s-base16-light.CodeMirror span.cm-variable{color:#90a959}.cm-s-base16-light.CodeMirror span.cm-variable-2{color:#6a9fb5}.cm-s-base16-light.CodeMirror span.cm-def{color:#d28445}.cm-s-base16-light.CodeMirror span.cm-bracket{color:#202020}.cm-s-base16-light.CodeMirror span.cm-tag{color:#ac4142}.cm-s-base16-light.CodeMirror span.cm-link{color:#aa759f}.cm-s-base16-light.CodeMirror span.cm-error{background:#ac4142;color:#505050}.cm-s-base16-light.CodeMirror .CodeMirror-activeline-background{background:#dddcdc}.cm-s-base16-light.CodeMirror .CodeMirror-matchingbracket{text-decoration:underline;color:#fff!important}",
        "",
      ]);
    },
    "d/OL": function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("hubpress:request-rendering-documents", function (e) {
          console.info("asciidocPlugin - hubpress:request-rendering-documents"),
            console.log(
              "asciidocPlugin - hubpress:request-rendering-documents",
              e
            );
          var t = e.rootState.application.config,
            n = (e.nextState.posts || []).map(function (e) {
              var n = o()({}, e, h(t, e.content), { content: e.content }),
                i = c.a.pick(
                  n,
                  "attributes",
                  "author",
                  "html",
                  "tags",
                  "content",
                  "name",
                  "path",
                  "sha"
                );
              (n.title = i.title = i.attributes.doctitle),
                (n.image = i.image = i.attributes["hp-image"]),
                (n.type = i.type = i.attributes["hp-type"]),
                (n.tags = i.tags = g(i.attributes)),
                (n.url = i.url = m(t, n.type, i.name));
              var r = o()({}, n, { original: i });
              return (
                (n.type && "post" !== n.type) ||
                  (r.original.published_at = r.published_at =
                    i.name.split("-").slice(0, 3).join("-")),
                r
              );
            });
          return (e.nextState.posts = n), e;
        }),
          e.on("requestRenderingPost", function (e) {
            console.info("asciidocPlugin - requestRenderingPost"),
              console.log("asciidocPlugin - requestRenderingPost", e);
            var t = h(e.rootState.application.config, e.nextState.post.content);
            (e.nextState.post = o()({}, e.nextState.post, t)),
              (e.nextState.post.title = t.attributes.doctitle),
              (e.nextState.post.image = t.attributes["hp-image"]),
              (e.nextState.post.type = t.attributes["hp-type"]),
              (e.nextState.post.tags = g(t.attributes)),
              (e.nextState.post.published_at =
                t.attributes.published_at ||
                e.nextState.post.published_at ||
                l()().format("YYYY-MM-DD"));
            var n = t.attributes["hp-alt-title"];
            return (
              e.nextState.post.type && "post" !== e.nextState.post.type
                ? (e.nextState.post.name =
                    d()("" + (n || e.nextState.post.title)) + ".adoc")
                : (e.nextState.post.name =
                    d()(
                      e.nextState.post.published_at +
                        "-" +
                        (n || e.nextState.post.title)
                    ) + ".adoc"),
              (e.nextState.post.url = m(
                e.rootState.application.config,
                e.nextState.post.type,
                e.nextState.post.name
              )),
              e
            );
          });
      };
      var i = n("woOf"),
        o = n.n(i),
        r = n("rzLr"),
        a = n.n(r),
        s = n("M4fF"),
        c = n.n(s),
        u = n("PJh5"),
        l = n.n(u),
        p = n("n+xr"),
        d = n.n(p),
        f = a()(!1, window.XMLHttpRequest);
      function h(e, t) {
        var n = {
            doctype: "article",
            backend: "html5",
            safe: "unsafe",
            attributes: [
              "showtitle!",
              "allow-uri-read",
              "imagesdir=" + e.urls.site + "/images",
              "icons=font",
            ],
          },
          i = (function (e) {
            var t = e.split("pass::[more]");
            return { excerpt: t[0], full: t.join("") };
          })(
            t.replace(
              /gist::([0-9]*)\[(lines=[0-9]*\.\.[0-9]*)?,?(type=([\w.]*))?,?(file=([\w.]*))?\]/g,
              "[source,$4]\n----\ninclude::https://gist.githubusercontent.com/raw/$1/$6[$2]\n----\n"
            )
          ),
          o = f.load(i.excerpt, n),
          r = f.load(i.full, n);
        return {
          attributes: r.getAttributes(),
          excerpt: o.$convert(),
          html: r.$convert(),
        };
      }
      function g(e) {
        return (
          e["hp-tags"] &&
          e["hp-tags"]
            .split(",")
            .map(function (e) {
              return e.trim();
            })
            .filter(function (e) {
              return "" !== e;
            })
        );
      }
      function m(e, t, n) {
        return e.urls.getContentUrl(n, t);
      }
    },
    dCDI: function (e, t, n) {
      "use strict";
      (function (e, t) {
        var i,
          o = n("pFYg"),
          r = n.n(o);
        (i = function (e) {
          var t;
          (t = e).overlayMode = function (e, n, i) {
            return {
              startState: function () {
                return {
                  base: t.startState(e),
                  overlay: t.startState(n),
                  basePos: 0,
                  baseCur: null,
                  overlayPos: 0,
                  overlayCur: null,
                  streamSeen: null,
                };
              },
              copyState: function (i) {
                return {
                  base: t.copyState(e, i.base),
                  overlay: t.copyState(n, i.overlay),
                  basePos: i.basePos,
                  baseCur: null,
                  overlayPos: i.overlayPos,
                  overlayCur: null,
                };
              },
              token: function (t, o) {
                return (
                  (t != o.streamSeen ||
                    Math.min(o.basePos, o.overlayPos) < t.start) &&
                    ((o.streamSeen = t), (o.basePos = o.overlayPos = t.start)),
                  t.start == o.basePos &&
                    ((o.baseCur = e.token(t, o.base)), (o.basePos = t.pos)),
                  t.start == o.overlayPos &&
                    ((t.pos = t.start),
                    (o.overlayCur = n.token(t, o.overlay)),
                    (o.overlayPos = t.pos)),
                  (t.pos = Math.min(o.basePos, o.overlayPos)),
                  null == o.overlayCur
                    ? o.baseCur
                    : (null != o.baseCur && o.overlay.combineTokens) ||
                      (i && null == o.overlay.combineTokens)
                    ? o.baseCur + " " + o.overlayCur
                    : o.overlayCur
                );
              },
              indent:
                e.indent &&
                function (t, n) {
                  return e.indent(t.base, n);
                },
              electricChars: e.electricChars,
              innerMode: function (t) {
                return { state: t.base, mode: e };
              },
              blankLine: function (t) {
                e.blankLine && e.blankLine(t.base),
                  n.blankLine && n.blankLine(t.overlay);
              },
            };
          };
        }),
          "object" ==
            ("undefined" == typeof exports ? "undefined" : r()(exports)) &&
          "object" == r()(e)
            ? i(n("8U58"))
            : "object" ==
                ("undefined" == typeof brackets
                  ? "undefined"
                  : r()(brackets)) && brackets.getModule
            ? i(brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"))
            : "function" == typeof define && n("nErl")
            ? define(["codemirror"], i)
            : i(t);
      }.call(t, n("f1Eh")(e), n("8U58")));
    },
    dZ6u: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        console.info("TagsGenerator - generate"),
          console.log("TagsGenerator - generate", e);
        var t = void 0;
        if (!s.a.isTemplateAvailable("tag")) return e;
        if (e.nextState.post && !e.nextState.post.tags && !e.nextState.tags)
          return e;
        t = e.nextState.tags
          ? e.nextState.publishedPosts.filter(function (t) {
              var n = e.nextState.tags.map(function (e) {
                  return e.trim();
                }),
                i = (t.tags || []).map(function (e) {
                  return e.trim();
                });
              return r.a.intersection(n, i).length;
            })
          : e.nextState.publishedPosts;
        var n = r.a.reduce(
            t,
            function (t, n) {
              if (!n.tags) return t;
              var i = r.a.reduce(
                n.tags,
                function (t, n) {
                  var i = u()(n);
                  return (
                    (e.nextState.post &&
                      e.nextState.post.tags &&
                      -1 === e.nextState.post.tags.indexOf(n)) ||
                      t.push(i),
                    t
                  );
                },
                []
              );
              return (
                r.a.uniq(i).forEach(function (e) {
                  (t[e] = t[e] || []), t[e].push(n);
                }),
                t
              );
            },
            {}
          ),
          o = e;
        return (
          r.a.each(n, function (e, t) {
            var n = { name: t, slug: u()(t), description: null };
            o = i.a.generate({
              opts: o,
              posts: e,
              tag: n,
              template: "tag",
              path: "tag/" + t + "/",
            });
          }),
          o
        );
      };
      var i = n("APUd"),
        o = n("M4fF"),
        r = n.n(o),
        a = n("j+6P"),
        s = n.n(a),
        c = n("n+xr"),
        u = n.n(c);
    },
    dd07: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".initialise-configuration form{text-align:left}",
        "",
      ]);
    },
    "e3+D": function (e, t, n) {
      "use strict";
      t.a = function (e) {
        return i.a.generate({
          opts: e,
          posts: e.nextState.publishedPosts,
          template: "index",
          path: "",
        });
      };
      var i = n("APUd");
    },
    fbRD: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i,
        o = n("NYxO"),
        r = n("LEOq"),
        a = n.n(r),
        s = {},
        c = {},
        u = {};
      console.log("Store"),
        (t.default = function () {
          if (i) return i;
          var e = (function (e) {
            return a.a.fireSync("application:stores", e);
          })({ currentState: { stores: [] } });
          return (
            console.log("Updateed", e),
            (i = new o.default.Store({
              state: s,
              actions: u,
              mutations: c,
              modules: e.nextState.stores,
            }))
          );
        });
    },
    gFkU: function (e, t, n) {
      "use strict";
      var i = n("Ie2b"),
        o = n.n(i),
        r = n("SDLk");
      var a = function (e) {
          n("krHu");
        },
        s = n("VU/8")(o.a, r.a, !1, a, null, null);
      t.default = s.exports;
    },
    giiL: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {}, [
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Email")]),
              n("input", {
                attrs: {
                  type: "email",
                  name: "social-email",
                  placeholder: "Email",
                },
                domProps: { value: e.social.email },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("GitHub")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-github",
                    placeholder: "GitHub",
                  },
                  domProps: { value: e.social.github },
                }),
                n("i", { staticClass: "github icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Twitter")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-twitter",
                    placeholder: "Twitter",
                  },
                  domProps: { value: e.social.twitter },
                }),
                n("i", { staticClass: "twitter icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Facebook")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-facebook",
                    placeholder: "Facebook",
                  },
                  domProps: { value: e.social.facebook },
                }),
                n("i", { staticClass: "facebook icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Google Plus")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-googleplus",
                    placeholder: "Google Plus",
                  },
                  domProps: { value: e.social.googleplus },
                }),
                n("i", { staticClass: "google plus icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Instagram")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-instagram",
                    placeholder: "Instagram",
                  },
                  domProps: { value: e.social.instagram },
                }),
                n("i", { staticClass: "instagram icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Pinterest")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-pinterest",
                    placeholder: "Pinterest",
                  },
                  domProps: { value: e.social.pinterest },
                }),
                n("i", { staticClass: "pinterest icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Flickr")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-flickr",
                    placeholder: "Flickr",
                  },
                  domProps: { value: e.social.flickr },
                }),
                n("i", { staticClass: "flickr icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Linkedin")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-linkedin",
                    placeholder: "Linkedin",
                  },
                  domProps: { value: e.social.linkedin },
                }),
                n("i", { staticClass: "linkedin icon" }),
              ]),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Stack Overflow")]),
              n("div", { staticClass: "ui left icon input" }, [
                n("input", {
                  attrs: {
                    type: "text",
                    name: "social-stackoverflow",
                    placeholder: "Stack Overflow",
                  },
                  domProps: { value: e.social.stackoverflow },
                }),
                n("i", { staticClass: "stack overflow icon" }),
              ]),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    j9sj: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([e.i, "", ""]);
    },
    "jAb+": function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([e.i, "", ""]);
    },
    jcay: function (e, t, n) {
      "use strict";
      var i = n("7t+N"),
        o = n.n(i),
        r = n("YG9q");
      t.a = {
        name: "application-settings",
        beforeCreate: function () {
          var e = this;
          this.$store.state.application.settingsTabs.forEach(function (t) {
            e.$options.components[t.id] = t.component;
          });
        },
        mounted: function () {
          o()(".settings-content .menu .item").tab();
        },
        methods: {
          submit: function () {
            var e = new FormData(document.getElementById("mainForm"));
            this.$store.dispatch(r.b.APPLICATION_PREPARE_CONFIG, e);
          },
        },
        computed: {
          tabs: function () {
            return this.$store.state.application.settingsTabs.sort(function (
              e
            ) {
              return e.label;
            });
          },
          config: function () {
            return this.$store.state.application.config || { meta: {} };
          },
        },
      };
    },
    kMyt: function (e, t, n) {
      "use strict";
      var i = n("jcay"),
        o = n("Irdm");
      var r = function (e) {
          n("SjaB");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    krHu: function (e, t, n) {
      var i = n("MHN4");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("53c64e6e", i, !0, { sourceMap: !1 });
    },
    lWwS: function (e, t, n) {
      "use strict";
      var i = n("90+m"),
        o = n("pyJH");
      var r = function (e) {
          n("pSdL");
        },
        a = n("VU/8")(i.a, o.a, !1, r, null, null);
      t.a = a.exports;
    },
    lYDI: function (e, t, n) {
      "use strict";
      n.d(t, "d", function () {
        return i;
      }),
        n.d(t, "e", function () {
          return o;
        }),
        n.d(t, "g", function () {
          return r;
        }),
        n.d(t, "f", function () {
          return a;
        }),
        n.d(t, "h", function () {
          return s;
        }),
        n.d(t, "a", function () {
          return c;
        }),
        n.d(t, "c", function () {
          return u;
        }),
        n.d(t, "b", function () {
          return l;
        });
      var i = "post:delete",
        o = "post:get",
        r = "post:remote-save",
        a = "post:publish",
        s = "post:unpublish",
        c = "posts:get",
        u = "post:change-content",
        l = "posts:synchronize";
    },
    m8kW: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".__nuxt-error-page{padding:16px;padding:1rem;background:#f7f8fb;color:#47494e;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-family:sans-serif;font-weight:100!important;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;position:absolute;top:0;left:0;right:0;bottom:0}.__nuxt-error-page .error{max-width:450px}.__nuxt-error-page .title{font-size:24px;font-size:1.5rem;margin-top:15px;color:#47494e;margin-bottom:8px}.__nuxt-error-page .description{color:#7f828b;line-height:21px;margin-bottom:10px}.__nuxt-error-page a{color:#7f828b!important;text-decoration:none}.__nuxt-error-page .logo{position:fixed;left:12px;bottom:12px}",
        "",
      ]);
    },
    mBSI: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this.$createElement;
          return (this._self._c || e)("div", [this._v("\n  Dashboard\n")]);
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    mtxM: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        var t = c.a.fireSync("application:routes", {
            currentState: { routes: [] },
          }),
          n = {
            base: "/hubpress/",
            mode: "hash",
            routes: [
              { path: "/login", component: l.a },
              {
                path: "/",
                component: { template: "<router-view></router-view>" },
                redirect: "/dashboard",
                meta: { auth: !0 },
                children: t.nextState.routes
                  .map(function (e) {
                    return console.log(e), e.entries;
                  })
                  .reduce(function (e, t) {
                    return e.concat(t);
                  }, []),
              },
            ],
          },
          i = new r.default(n);
        return (
          (i.routes = t.nextState.routes),
          i.beforeEach(function (e, t, n) {
            var i = Object(a.default)();
            e.matched.some(function (e) {
              return e.meta.auth;
            })
              ? i.state.authentication.isAuthenticated
                ? n()
                : n({ path: "/login", query: { redirect: e.fullPath } })
              : n();
          }),
          i
        );
      };
      var i = n("I3G/"),
        o = n.n(i),
        r = n("/ocq"),
        a = n("fbRD"),
        s = n("LEOq"),
        c = n.n(s),
        u = (n("7cn8"), n("YG9q")),
        l = n("QMmS"),
        p = n("3oxy"),
        d = n("H8Oa"),
        f = n("bxJ0"),
        h = n("WiUJ"),
        g = n("H1PK"),
        m = n("d/OL"),
        v = (n("Y2j8"), n("1AqL")),
        b = n("tLh+");
      console.log("router =============="),
        console.log("Router"),
        o.a.use(r.default),
        c.a.register(u.a, l.b, p.a, d.a, f.a, h.a, g.a, m.a, v.a, b.a),
        console.log("Registered plugins", c.a.list());
    },
    oS0V: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "ui center aligned grid" }, [
            n("div", { staticClass: "ui middle aligned grid" }, [
              e.requireInitilisation
                ? n("div", { staticClass: "column" }, [
                    n(
                      "div",
                      { staticClass: "ui segment" },
                      [n("initialisation-component", { tag: "component" })],
                      1
                    ),
                  ])
                : e._e(),
              e.requireInitilisation
                ? e._e()
                : n(
                    "div",
                    { staticClass: "column", attrs: { id: "loginForm" } },
                    [
                      n("div", { staticClass: "ui segment" }, [
                        n("img", {
                          staticClass: "image",
                          attrs: {
                            src: "https://hubpress.dev/img/freeze/logo.png",
                          },
                        }),
                        n("h2", { staticClass: "ui header" }, [
                          e._v("\n          Welcome!\n        "),
                        ]),
                        n("div", { staticClass: "content" }),
                        n(
                          "form",
                          {
                            staticClass: "ui medium form",
                            on: {
                              submit: function (t) {
                                t.preventDefault(),
                                  e.login({
                                    email: e.email,
                                    password: e.password,
                                  });
                              },
                            },
                          },
                          [
                            n("div", { staticClass: "field" }, [
                              n("div", { staticClass: "ui left icon input" }, [
                                n("i", { staticClass: "user icon" }),
                                n("input", {
                                  attrs: {
                                    type: "text",
                                    name: "email",
                                    placeholder: "Username or e-mail address",
                                  },
                                  domProps: { value: e.email },
                                  on: { input: e.updateEmail },
                                }),
                              ]),
                            ]),
                            n("div", { staticClass: "field" }, [
                              n("div", { staticClass: "ui left icon input" }, [
                                n("i", { staticClass: "lock icon" }),
                                n("input", {
                                  attrs: {
                                    type: "password",
                                    name: "password",
                                    placeholder: "Password",
                                  },
                                  domProps: { value: e.password },
                                  on: { input: e.updatePassword },
                                }),
                              ]),
                            ]),
                            e.isTwoFactorCodeRequired
                              ? n("div", { staticClass: "field" }, [
                                  n(
                                    "div",
                                    { staticClass: "ui left icon input" },
                                    [
                                      n("i", { staticClass: "key icon" }),
                                      n("input", {
                                        attrs: {
                                          type: "text",
                                          name: "twoFactorCode",
                                          placeholder: "Two factor code",
                                        },
                                        domProps: { value: e.twoFactorCode },
                                        on: { input: e.updateTwoFactorCode },
                                      }),
                                    ]
                                  ),
                                ])
                              : e._e(),
                            n(
                              "button",
                              {
                                staticClass: "ui fluid large submit button",
                                attrs: { type: "submit", name: "button" },
                              },
                              [e._v("Login")]
                            ),
                          ]
                        ),
                        e._m(0),
                      ]),
                    ]
                  ),
            ]),
          ]);
        },
        staticRenderFns: [
          function () {
            var e = this.$createElement,
              t = this._self._c || e;
            return t("div", { staticClass: "ui message" }, [
              this._v(
                "\n          If you have questions about how to use HubPress, "
              ),
              t(
                "a",
                {
                  attrs: {
                    href: "https://hubpress.gitbooks.io/hubpress-knowledgebase/content/",
                  },
                },
                [this._v("here is the right place.")]
              ),
            ]);
          },
        ],
      };
      t.a = i;
    },
    oz2E: function (e, t, n) {
      "use strict";
      t.a = {
        name: "dashboard",
        beforeCreate: function () {
          console.log("dashboard beforeCreate");
        },
        created: function () {
          console.log("dashboard created");
        },
      };
    },
    pSdL: function (e, t, n) {
      var i = n("LnjV");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("2e903ce0", i, !0, { sourceMap: !1 });
    },
    pyJH: function (e, t, n) {
      "use strict";
      var i = {
        render: function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {}, [
            n("h4", { staticClass: "ui dividing header" }, [
              e._v("Informations"),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Title")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-title",
                  placeholder: "Title",
                },
                domProps: { value: e.site.title },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Description")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-description",
                  placeholder: "Description",
                },
                domProps: { value: e.site.description },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Logo")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-logo",
                  placeholder: "Logo",
                },
                domProps: { value: e.site.logo },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Cover image")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-cover-image",
                  placeholder: "Cover image",
                },
                domProps: { value: e.site.cover },
              }),
            ]),
            n("h4", { staticClass: "ui dividing header" }, [e._v("Rendering")]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Live preview render delay (ms)")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-render-delay",
                  placeholder: "300",
                },
                domProps: { value: e.meta.delay },
              }),
            ]),
            n("h4", { staticClass: "ui dividing header" }, [
              e._v("Generation"),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Theme")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-theme",
                  placeholder: "Theme",
                },
                domProps: { value: e.theme.name },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Posts per page")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-posts-per-page",
                  placeholder: "Posts per page",
                },
                domProps: { value: e.site.postsPerPage },
              }),
            ]),
            n("h4", { staticClass: "ui dividing header" }, [e._v("Services")]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Google analytics")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-ga",
                  placeholder: "Google analytics",
                },
                domProps: { value: e.site.googleAnalytics },
              }),
            ]),
            n("div", { staticClass: "field" }, [
              n("label", [e._v("Disqus shortname")]),
              n("input", {
                attrs: {
                  type: "text",
                  name: "hubpress-disqus",
                  placeholder: "Disqus shortname",
                },
                domProps: { value: e.site.disqus },
              }),
            ]),
          ]);
        },
        staticRenderFns: [],
      };
      t.a = i;
    },
    qZPA: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".html-rendering,.published-preview{min-width:100%;height:calc(100vh - 47px);min-height:calc(100vh - 47px)}",
        "",
      ]);
    },
    qcny: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return D;
      });
      var i = n("Xxa5"),
        o = n.n(i),
        r = n("//Fk"),
        a = (n.n(r), n("C4MV")),
        s = n.n(a),
        c = n("woOf"),
        u = n.n(c),
        l = n("Dd8w"),
        p = n.n(l),
        d = n("exGp"),
        f = n.n(d),
        h = n("MU8w"),
        g = (n.n(h), n("I3G/")),
        m = n.n(g),
        v = n("p3jY"),
        b = n.n(v),
        x = n("mtxM"),
        C = n("0F0d"),
        y = n("HBB+"),
        w = n("WRRc"),
        P = n("ct3O"),
        k = n("Hot+"),
        S = n("yTq1"),
        _ = n("YLfZ"),
        R = n("J2Ti"),
        q = n("zQW4"),
        M = n("6hdJ");
      n.d(t, "a", function () {
        return P.a;
      });
      var $,
        D =
          (($ = f()(
            o.a.mark(function e(t) {
              var n, i, r, a, c, l, d;
              return o.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = Object(x.a)(t)),
                          ((i = Object(R.a)(t)).$router = n),
                          (r = p()(
                            {
                              router: n,
                              store: i,
                              nuxt: {
                                defaultTransition: j,
                                transitions: [j],
                                setTransitions: function (e) {
                                  return (
                                    Array.isArray(e) || (e = [e]),
                                    (e = e.map(function (e) {
                                      return (e = e
                                        ? "string" == typeof e
                                          ? u()({}, j, { name: e })
                                          : u()({}, j, e)
                                        : j);
                                    })),
                                    (this.$options.nuxt.transitions = e),
                                    e
                                  );
                                },
                                err: null,
                                dateErr: null,
                                error: function (e) {
                                  (e = e || null),
                                    (r.context._errored = !!e),
                                    "string" == typeof e &&
                                      (e = { statusCode: 500, message: e });
                                  var n = this.nuxt || this.$options.nuxt;
                                  return (
                                    (n.dateErr = Date.now()),
                                    (n.err = e),
                                    t && (t.nuxt.error = e),
                                    e
                                  );
                                },
                              },
                            },
                            S.a
                          )),
                          (i.app = r),
                          (a = t
                            ? t.next
                            : function (e) {
                                return r.router.push(e);
                              }),
                          (c = void 0),
                          t
                            ? (c = n.resolve(t.url).route)
                            : ((l = Object(_.d)(n.options.base)),
                              (c = n.resolve(l).route)),
                          (e.next = 10),
                          Object(_.m)(r, {
                            route: c,
                            next: a,
                            error: r.nuxt.error.bind(r),
                            store: i,
                            payload: t ? t.payload : void 0,
                            req: t ? t.req : void 0,
                            res: t ? t.res : void 0,
                            beforeRenderFns: t ? t.beforeRenderFns : void 0,
                          })
                        );
                      case 10:
                        if (
                          ((d = function (e, t) {
                            if (!e)
                              throw new Error(
                                "inject(key, value) has no key provided"
                              );
                            if (!t)
                              throw new Error(
                                "inject(key, value) has no value provided"
                              );
                            (r[(e = "$" + e)] = t), (i[e] = r[e]);
                            var n = "__nuxt_" + e + "_installed__";
                            m.a[n] ||
                              ((m.a[n] = !0),
                              m.a.use(function () {
                                m.a.prototype.hasOwnProperty(e) ||
                                  s()(m.a.prototype, e, {
                                    get: function () {
                                      return this.$root.$options[e];
                                    },
                                  });
                              }));
                          }),
                          window.__NUXT__ &&
                            window.__NUXT__.state &&
                            i.replaceState(window.__NUXT__.state),
                          "function" != typeof q.a)
                        ) {
                          e.next = 15;
                          break;
                        }
                        return (e.next = 15), Object(q.a)(r.context, d);
                      case 15:
                        if ("function" != typeof M.a) {
                          e.next = 18;
                          break;
                        }
                        return (e.next = 18), Object(M.a)(r.context, d);
                      case 18:
                        e.next = 21;
                        break;
                      case 21:
                        return e.abrupt("return", {
                          app: r,
                          router: n,
                          store: i,
                        });
                      case 22:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          )),
          function (e) {
            return $.apply(this, arguments);
          });
      m.a.component(C.a.name, C.a),
        m.a.component(y.a.name, y.a),
        m.a.component(w.a.name, w.a),
        m.a.component(k.a.name, k.a),
        m.a.use(b.a, {
          keyName: "head",
          attribute: "data-n-head",
          ssrAttribute: "data-n-head-ssr",
          tagIDKeyName: "hid",
        });
      var j = {
        name: "page",
        mode: "out-in",
        appear: !0,
        appearClass: "appear",
        appearActiveClass: "appear-active",
        appearToClass: "appear-to",
      };
    },
    r6qT: function (e, t, n) {
      var i = n("HEYa");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("2b9275f1", i, !0, { sourceMap: !1 });
    },
    "tLh+": function (e, t, n) {
      "use strict";
      t.a = function (e) {
        e.on("requestGenerateIndex", function (e) {
          console.info("rssPlugin - requestGenerateIndex"),
            console.log("rssPlugin - requestGenerateIndex", e);
          var t = e.rootState.application.config.site || {},
            n = e.rootState.application.config.urls.site || "",
            i = e.nextState.publishedPosts || [],
            r = new o.a({
              title: t.title || "",
              description: t.description || "",
              feed_url: n + "/rss/",
              site_url: n,
              image_url: t.cover,
              ttl: "60",
            });
          i.forEach(function (e) {
            r.item({
              title: e.title,
              description: e.html,
              url: "" + n + e.url,
              categories: e.tags,
              author: e.author.name,
              date: e.published_at,
            });
          });
          var a = r.xml(),
            s = [];
          return (
            s.push({
              name: "RSS",
              path: "rss/index.xml",
              content: a,
              message: "Publish rss feed",
            }),
            (e.nextState.elementsToPublish = (
              e.nextState.elementsToPublish || []
            ).concat(s)),
            e
          );
        });
      };
      var i = n("DVIz"),
        o = n.n(i);
    },
    unZF: function (e, t, n) {
      "use strict";
      var i = n("BO1k"),
        o = n.n(i),
        r = n("GfDd"),
        a = r.keys();
      function s(e) {
        var t = r(e);
        return t.default ? t.default : t;
      }
      var c = {},
        u = !0,
        l = !1,
        p = void 0;
      try {
        for (var d, f = o()(a); !(u = (d = f.next()).done); u = !0) {
          var h = d.value;
          c[h.replace(/^\.\//, "").replace(/\.(js|ts)$/, "")] = s(h);
        }
      } catch (e) {
        (l = !0), (p = e);
      } finally {
        try {
          !u && f.return && f.return();
        } finally {
          if (l) throw p;
        }
      }
      t.a = c;
    },
    vKgl: function (e, t, n) {
      var i = n("EgsU");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("44921a73", i, !0, { sourceMap: !1 });
    },
    vXEZ: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".nuxt-progress{position:fixed;top:0;left:0;right:0;height:2px;width:0;-webkit-transition:width .2s,opacity .4s;transition:width .2s,opacity .4s;opacity:1;background-color:#efc14e;z-index:999999}",
        "",
      ]);
    },
    wGIl: function (e, t, n) {
      var i = n("m8kW");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("6bc7b368", i, !0, { sourceMap: !1 });
    },
    wQtD: function (e, t, n) {
      "use strict";
      t.a = {
        name: "navigation-settings",
        data: function () {
          return {
            newNav: { label: "", url: "" },
            navigation: this.$store.state.application.config.navigation || [],
          };
        },
        computed: {
          isNotValid: function () {
            return (
              "" === this.newNav.label.trim() || "" === this.newNav.url.trim()
            );
          },
        },
        methods: {
          remove: function (e) {
            this.navigation.splice(e, 1);
          },
          clear: function () {
            this.newNav = { label: "", url: "" };
          },
          add: function (e) {
            this.navigation.push(e), this.clear();
          },
        },
      };
    },
    wrAo: function (e, t, n) {
      "use strict";
      t.a = {
        name: "hubpress-settings-social",
        computed: {
          social: function () {
            return this.$store.state.application.config.socialnetwork || {};
          },
        },
      };
    },
    xgbc: function (e, t, n) {
      var i = n("y4OV");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("0c6dd1d8", i, !0, { sourceMap: !1 });
    },
    y4OV: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([e.i, "", ""]);
    },
    yJpT: function (e, t, n) {
      var i = n("j9sj");
      "string" == typeof i && (i = [[e.i, i, ""]]),
        i.locals && (e.exports = i.locals);
      n("rjj0")("33615082", i, !0, { sourceMap: !1 });
    },
    yTq1: function (e, t, n) {
      "use strict";
      var i = n("//Fk"),
        o = n.n(i),
        r = n("I3G/"),
        a = n.n(r),
        s = n("F88d"),
        c = n("XSDV"),
        u =
          (n.n(c),
          {
            _default: function () {
              return n
                .e(0)
                .then(n.bind(null, "Ma2J"))
                .then(function (e) {
                  return e.default || e;
                });
            },
          }),
        l = {};
      t.a = {
        head: {
          title: "Hubpress: A web application to build your Blog",
          meta: [
            { charset: "utf-8" },
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1",
            },
            {
              hid: "description",
              name: "description",
              content: "Nuxt.js project",
            },
          ],
          link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "stylesheet", href: "../static/semantic/semantic.min.css" },
          ],
          style: [],
          script: [],
        },
        render: function (e, t) {
          var n = e("nuxt-loading", { ref: "loading" }),
            i = e(this.layout || "nuxt");
          return e("div", { domProps: { id: "__nuxt" } }, [
            n,
            e("transition", { props: { name: "layout", mode: "out-in" } }, [
              e("div", { domProps: { id: "__layout" }, key: this.layoutName }, [
                i,
              ]),
            ]),
          ]);
        },
        data: function () {
          return { layout: null, layoutName: "" };
        },
        beforeCreate: function () {
          a.a.util.defineReactive(this, "nuxt", this.$options.nuxt);
        },
        created: function () {
          (a.a.prototype.$nuxt = this),
            "undefined" != typeof window && (window.$nuxt = this),
            (this.error = this.nuxt.error);
        },
        mounted: function () {
          this.$loading = this.$refs.loading;
        },
        watch: { "nuxt.err": "errorChanged" },
        methods: {
          errorChanged: function () {
            this.nuxt.err &&
              this.$loading &&
              (this.$loading.fail && this.$loading.fail(),
              this.$loading.finish && this.$loading.finish());
          },
          setLayout: function (e) {
            (e && l["_" + e]) || (e = "default"), (this.layoutName = e);
            var t = "_" + e;
            return (this.layout = l[t]), this.layout;
          },
          loadLayout: function (e) {
            var t = this;
            (e && (u["_" + e] || l["_" + e])) || (e = "default");
            var n = "_" + e;
            return l[n]
              ? o.a.resolve(l[n])
              : u[n]()
                  .then(function (e) {
                    return (l[n] = e), delete u[n], l[n];
                  })
                  .catch(function (e) {
                    if (t.$nuxt)
                      return t.$nuxt.error({
                        statusCode: 500,
                        message: e.message,
                      });
                  });
          },
        },
        components: { NuxtLoading: s.a },
      };
    },
    yUYC: function (e, t, n) {
      "use strict";
      var i = n("I3G/"),
        o = n.n(i);
      t.a = {
        name: "nuxt-loading",
        data: function () {
          return {
            percent: 0,
            show: !1,
            canSuccess: !0,
            duration: 5e3,
            height: "2px",
            color: "#3B8070",
            failedColor: "red",
          };
        },
        methods: {
          start: function () {
            var e = this;
            return (
              (this.show = !0),
              (this.canSuccess = !0),
              this._timer && (clearInterval(this._timer), (this.percent = 0)),
              (this._cut = 1e4 / Math.floor(this.duration)),
              (this._timer = setInterval(function () {
                e.increase(e._cut * Math.random()),
                  e.percent > 95 && e.finish();
              }, 100)),
              this
            );
          },
          set: function (e) {
            return (
              (this.show = !0),
              (this.canSuccess = !0),
              (this.percent = Math.floor(e)),
              this
            );
          },
          get: function () {
            return Math.floor(this.percent);
          },
          increase: function (e) {
            return (this.percent = this.percent + Math.floor(e)), this;
          },
          decrease: function (e) {
            return (this.percent = this.percent - Math.floor(e)), this;
          },
          finish: function () {
            return (this.percent = 100), this.hide(), this;
          },
          pause: function () {
            return clearInterval(this._timer), this;
          },
          hide: function () {
            var e = this;
            return (
              clearInterval(this._timer),
              (this._timer = null),
              setTimeout(function () {
                (e.show = !1),
                  o.a.nextTick(function () {
                    setTimeout(function () {
                      e.percent = 0;
                    }, 200);
                  });
              }, 500),
              this
            );
          },
          fail: function () {
            return (this.canSuccess = !1), this;
          },
        },
      };
    },
    ys1n: function (e, t, n) {
      (e.exports = n("FZ+f")(!1)).push([
        e.i,
        ".grid[data-v-94154cf6]{margin:0;height:100%;background-color:#dadada}#loginForm.column[data-v-94154cf6]{max-width:450px;text-align:center}.column[data-v-94154cf6]{max-width:750px}",
        "",
      ]);
    },
    zQW4: function (e, t, n) {
      "use strict";
      for (
        var i = n("woOf"),
          o = n.n(i),
          r = n("//Fk"),
          a = n.n(r),
          s = n("BO1k"),
          c = n.n(s),
          u = n("mtWM"),
          l = n.n(u),
          p = {
            setHeader: function (e, t) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : "common",
                i = !0,
                o = !1,
                r = void 0;
              try {
                for (
                  var a, s = c()(Array.isArray(n) ? n : [n]);
                  !(i = (a = s.next()).done);
                  i = !0
                ) {
                  var u = a.value;
                  if (!t) return void delete this.defaults.headers[u][e];
                  this.defaults.headers[u][e] = t;
                }
              } catch (e) {
                (o = !0), (r = e);
              } finally {
                try {
                  !i && s.return && s.return();
                } finally {
                  if (o) throw r;
                }
              }
            },
            setToken: function (e, t) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : "common",
                i = e ? (t ? t + " " : "") + e : null;
              this.setHeader("Authorization", i, n);
            },
            onRequest: function (e) {
              this.interceptors.request.use(function (t) {
                return e(t) || t;
              });
            },
            onResponse: function (e) {
              this.interceptors.response.use(function (t) {
                return e(t) || t;
              });
            },
            onRequestError: function (e) {
              this.interceptors.request.use(void 0, function (t) {
                return e(t) || a.a.reject(t);
              });
            },
            onResponseError: function (e) {
              this.interceptors.response.use(void 0, function (t) {
                return e(t) || a.a.reject(t);
              });
            },
            onError: function (e) {
              this.onRequestError(e), this.onResponseError(e);
            },
          },
          d = function (e) {
            p["$" + e] = function () {
              return this[e].apply(this, arguments).then(function (e) {
                return e && e.data;
              });
            };
          },
          f = [
            "request",
            "delete",
            "get",
            "head",
            "options",
            "post",
            "put",
            "patch",
          ],
          h = 0;
        h < f.length;
        h++
      ) {
        d(f[h]);
      }
      t.a = function (e, t) {
        var n = {
          baseURL: "http://localhost:3000/",
          headers: {
            common: { Accept: "application/json, text/plain, */*" },
            delete: {},
            get: {},
            head: {},
            post: {},
            put: {},
            patch: {},
          },
        };
        (n.headers.common =
          e.req && e.req.headers ? o()({}, e.req.headers) : {}),
          delete n.headers.common.accept,
          delete n.headers.common.host;
        var i = l.a.create(n);
        !(function (e) {
          for (var t in p) e[t] = p[t].bind(e);
        })(i),
          (function (e, t) {
            var n = {
                finish: function () {},
                start: function () {},
                fail: function () {},
                set: function () {},
              },
              i = function () {
                return window.$nuxt &&
                  window.$nuxt.$loading &&
                  window.$nuxt.$loading.set
                  ? window.$nuxt.$loading
                  : n;
              },
              o = 0;
            e.onRequest(function (e) {
              (e && !1 === e.progress) || o++;
            }),
              e.onResponse(function (e) {
                (e && e.config && !1 === e.config.progress) ||
                  (--o <= 0 && ((o = 0), i().finish()));
              }),
              e.onError(function (e) {
                (e && e.config && !1 === e.config.progress) ||
                  (o--, i().fail(), i().finish());
              });
            var r = function (e) {
              if (o) {
                var t = (100 * e.loaded) / (e.total * o);
                i().set(Math.min(100, t));
              }
            };
            (e.defaults.onUploadProgress = r),
              (e.defaults.onDownloadProgress = r);
          })(i),
          (e.$axios = i),
          t("axios", i);
      };
    },
  },
  ["T23V"]
);
