# Props

## Component Props

| Parameter                  | Type                 | Default Value | Description                                                       |
| -------------------------- | -------------------- | ------------- | ----------------------------------------------------------------- |
| `startDate`                | `string`             | **required**  | The start date of the Gantt chart, in `YYYY-MM-DD` format.        |
| `endDate`                  | `string`             | **required**  | The end date of the Gantt chart, in `YYYY-MM-DD` format.          |
| `rowHeight`                | `number`             | `36`          | The height of each row in pixels.                                 |
| `headHeight`               | `number`             | `32`          | The height of the header section in pixels.                       |
| `colWidth`                 | `number`             | `32`          | The width of each time unit (e.g., day or month) in pixels.       |
| `rowActiveBackgroundColor` | `string`             | `#cbe3f1`     | The background color of the active (selected) row.                |
| `rowActiveBorderColor`     | `string`             | `#a4cee7`     | The border color of the active row.                               |
| `cellUnit`                 | `"day"` or `"month"` | `"day"`       | Specifies whether the time axis is displayed by day or by month.  |
| `leftWidth`                | `number`             | `200`         | The width of the left sidebar in pixels.                          |
| `data`                     | `Gantt[]`            | **required**  | The array of Gantt chart data. See `Gantt` interface for details. |

## Gantt Interface

| Parameter       | Type        | Default Value | Description                          |
| --------------- | ----------- | ------------- | ------------------------------------ |
| `name`          | `string`    | **required**  | The name of the Gantt chart.         |
| `projects`      | `Project[]` | **required**  | An array of `Project` objects.       |
| `[key: string]` | `any`       | -             | Allows additional custom properties. |

## Project Interface

| Parameter    | Type     | Default Value | Description                                                  |
| ------------ | -------- | ------------- | ------------------------------------------------------------ |
| `name`       | `string` | **required**  | The name of the project.                                     |
| `startDate`  | `string` | **required**  | The start date of the project in `YYYY-MM-DD` format.        |
| `endDate`    | `string` | **required**  | The end date of the project in `YYYY-MM-DD` format.          |
| `background` | `string` | `undefined`   | The background color for the project bar in the Gantt chart. |
| `color`      | `string` | `undefined`   | The text color for the project bar in the Gantt chart.       |
