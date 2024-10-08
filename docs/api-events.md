# Events

| Event Name    | Parameters                                                            | Description                                                                       |
| ------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `dragend-bar` | `{ e: MouseEvent, bar: Project, barIndex: number, rowIndex: number }` | Emitted when a bar drag operation ends.                                           |
| `click-bar`   | `{ e: MouseEvent, bar: Project, barIndex: number, rowIndex: number }` | Emitted when a bar is clicked.                                                    |
| `click-row`   | `{ e: MouseEvent, row: Gantt, time: string, rowIndex: number }`       | Emitted when a row is clicked. The `time` represents the time clicked in the row. |
