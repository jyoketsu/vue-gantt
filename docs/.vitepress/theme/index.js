import DefaultTheme from "vitepress/theme";
import vuegantt from "../../../src/vue-gantt";
import "../../../src/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(vuegantt);
  },
};
