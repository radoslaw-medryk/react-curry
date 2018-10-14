# react-curry

Project aimed to resolve problem of parametrized callback props in React causing constant rerender of component.

`curry` function will ensure that for given set of arguments to outer function only single instance of inner function will be created. Inner instance will be reused on subnsequest calls with the same arguments.

### Example usage:

```typescript
import * as React from "react";
import { curry } from "@radoslaw-medryk/react-curry";

const items = [
    { id: "one", content: "Number 1" },
    { id: "two", content: "Number 2" },
    { id: "three", content: "Number 3" },
];

export class List extends React.Component<{}, {}> {
    public render() {
        return (
            <ul>
                {items.map(q =>
                    <li key={q.id} onClick={this.onItemClick(q.id)}>{q.content}</li>
                )}
            </ul>
        );
    }

    private onItemClick = curry((id: string) => (e: React.MouseEvent) => {
        alert(`Clicked item with id = '${id}'.`);
    });
}
```
