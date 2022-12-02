// react-ace editor
import AceEditor from "react-ace";

// 这两个插件用于编辑器内搜索框、代码联想提示
import "ace-builds/src-min-noconflict/ext-searchbox"
import "ace-builds/src-min-noconflict/ext-language_tools"

// 解决webpack打包问题
import "ace-builds/webpack-resolver"
import {useEffect, useRef, useState} from "react";

// 引入自定义mode
import "./mode-yankai"
import "./theme-yankai.css"

function App(props) {

    const [content, setContent] = useState("");
    const editorRef = useRef(null);

    // 直接onLoad增加complete存在bug，需要使用useEffect解决
    useEffect(() => {
        if (editorRef.current) {
            complete(editorRef.current.editor)
        }
    }, [editorRef])

    // 自定义编辑器的代码补全器
    const complete = editor => {

        const YankaiCompleter = [
            {
                name: "and",
                value: "and",
                score: 100, // 提示优先级
                meta: "[关键字] 逻辑与"
            }, {
                name: "println",
                value: "println(str)",
                score: 99,
                meta: "[内置函数] 标准输出"
            },
        ]

        editor.completers = [{
            getCompletions: function (editor, session, pos, prefix, callback) {
                callback(null, YankaiCompleter)
            }
        }]
    }

    return (
        <div>
            <AceEditor
                ref={editorRef}
                mode="yankai"
                placeholder="由此开始输入代码"
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4
                }}
                fontSize={13}
                style={{height: 500, width: '100%', border: '1px solid #d9d9d9'}}
                value={content}
                onChange={(value) => setContent(value)}
                onLoad={complete}
            />
            <div>其他内容</div>
        </div>
    );
}

export default App;
