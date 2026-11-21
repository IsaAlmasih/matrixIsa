module.exports = [
"[project]/src/components/MatrixRain/MatrixRain.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatrixRain",
    ()=>MatrixRain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const langs = [
    "010000010111",
    "100100101011",
    "011010110101",
    "110010101010",
    "101111111111",
    "111111100010",
    "010010101011",
    "100100101010",
    "001000000001",
    "110010101110",
    "001010101001",
    "110000000110",
    "011010101001",
    "100110111110",
    "010101010101",
    "110010101110",
    "100000011111"
];
const columnGap = 20;
const characterGap = 20;
const MatrixRain = ()=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;
        let columns = [];
        let animationFrame;
        let lastFrameTime = 0;
        const frameInterval = 100;
        const resize = ()=>{
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(window.innerWidth * pixelRatio);
            canvas.height = Math.round(window.innerHeight * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.font = "16px monospace";
            context.textBaseline = "top";
            columns = [];
            for(let x = 0; x < window.innerWidth; x += columnGap){
                const text = langs[Math.floor(Math.random() * langs.length)];
                const initialOffset = Math.floor(Math.random() * text.length);
                const speed = Math.floor(Math.random() * 6) + 3;
                columns.push(Array.from(text, (value, index)=>({
                        value,
                        y: (initialOffset + index + 1) * characterGap,
                        speed
                    })));
            }
        };
        const draw = (timestamp)=>{
            animationFrame = window.requestAnimationFrame(draw);
            if (timestamp - lastFrameTime < frameInterval) return;
            const elapsed = lastFrameTime ? timestamp - lastFrameTime : frameInterval;
            lastFrameTime = timestamp;
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            context.fillStyle = "#0000FF";
            columns.forEach((column, columnIndex)=>{
                column.forEach((character)=>{
                    character.y = character.y > window.innerHeight ? 0 : character.y + character.speed * elapsed / frameInterval;
                    context.fillText(Math.random() < 0.1 ? "0" : character.value, columnIndex * columnGap, character.y);
                });
            });
        };
        resize();
        window.addEventListener("resize", resize);
        animationFrame = window.requestAnimationFrame(draw);
        return ()=>{
            window.removeEventListener("resize", resize);
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: "black",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            zIndex: -1
        },
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            style: {
                display: "block",
                width: "100%",
                height: "100%"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/MatrixRain/MatrixRain.jsx",
            lineNumber: 112,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/MatrixRain/MatrixRain.jsx",
        lineNumber: 99,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=src_components_MatrixRain_MatrixRain_jsx_47ea8ae8._.js.map