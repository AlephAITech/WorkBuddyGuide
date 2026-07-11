import { defineAsyncComponent } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import GroupQrMenu from "./components/GroupQrMenu.vue";
import HomePage from "./components/HomePage.vue";

import "./fonts.css";
import "./iconfont.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("GroupQrMenu", GroupQrMenu);
    app.component("HomePage", HomePage);
    app.component(
      "MermaidDiagram",
      defineAsyncComponent(() => import("./components/MermaidDiagram.vue")),
    );
  },
};
