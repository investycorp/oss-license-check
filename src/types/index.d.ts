declare module 'gradle-to-js/lib/parser' {
    function parseFile(path: string): Promise<any>
    function parseText(text: string): Promise<any>

    export { parseFile, parseText };
}
