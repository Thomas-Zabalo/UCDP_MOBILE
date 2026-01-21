// src/data/navigationStack.ts

export const mainRoutes = ["/", "/mission", "/message", "/user", "/new/mission"];

export type NavStackItem = {
    path: string;
};

export class NavigationStack {
    private stack: NavStackItem[] = [];

    push(path: string) {
        if (this.current() === path) return;

        if (mainRoutes.includes(path)) {
            this.stack = [{ path }];
        } else {
            this.stack.push({ path });
        }
    }

    getPreviousPath(): string | null {
        if (this.stack.length > 1) {
            return this.stack[this.stack.length - 2].path;
        }
        return null;
    }

    pop() {
        if (this.stack.length > 1) {
            this.stack.pop();
        }
    }

    current(): string | undefined {
        return this.stack[this.stack.length - 1]?.path;
    }
}

export const navStack = new NavigationStack();