import { defineAsyncComponent } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import GroupQrMenu from "./components/GroupQrMenu.vue";
import HomePage from "./components/HomePage.vue";

import "./fonts.css";
import "./style.css";

const scrollActiveSidebarItemIntoView = () => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const sidebar = document.querySelector<HTMLElement>(".VPSidebar");
      const activeItem = sidebar?.querySelector<HTMLElement>(
        ".VPSidebarItem.is-active",
      );

      if (!sidebar || !activeItem) return;

      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();
      const isVisible =
        activeRect.top >= sidebarRect.top &&
        activeRect.bottom <= sidebarRect.bottom;

      if (!isVisible) {
        sidebar.scrollTo({
          top:
            sidebar.scrollTop +
            activeRect.top -
            sidebarRect.top -
            sidebar.clientHeight / 2 +
            activeRect.height / 2,
          behavior: "smooth",
        });
      }
    });
  });
};

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component("GroupQrMenu", GroupQrMenu);
    app.component("HomePage", HomePage);
    app.component(
      "MermaidDiagram",
      defineAsyncComponent(() => import("./components/MermaidDiagram.vue")),
    );

    if (typeof window !== "undefined") {
      const previousAfterRouteChange = router.onAfterRouteChange;

      router.onAfterRouteChange = async (to) => {
        await previousAfterRouteChange?.(to);
        scrollActiveSidebarItemIntoView();
      };

      scrollActiveSidebarItemIntoView();
    }
  },
};
