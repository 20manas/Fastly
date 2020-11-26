// / <reference types="next" />
// / <reference types="next/types/global" />

declare module '*.css' {
    const classes: { [key: string]: string};
    export default classes;
}

declare module '*.scss' {
    const classes: { [key: string]: string};
    export default classes;
}
