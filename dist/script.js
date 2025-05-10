// 检查语言设置和进度

let language = localStorage.getItem('language') || 'zh-CN';  // 默认语言为中文简体

let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;

let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

let totalQuestions = 10;  // 总共有10道题目

const questions = [

    {

        "zh-CN": {question: "你认为政府应该干预经济以重新分配财富吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你認為政府應該干預經濟以重新分配財富嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "政府は経済に介入して富を再分配すべきだと思いますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持全民医保吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持全民健保嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "あなたは国民皆保険を支持しますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持企业自由竞争而不是政府对市场的管控吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持企業自由競爭而不是政府對市場的管控嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "あなたは企業の自由競争を支持し、政府の市場介入を支持しませんか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你认为环境保护应该优先于经济发展吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你認為環境保護應該優先於經濟發展嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "環境保護は経済発展よりも優先されるべきだと思いますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持缩小贫富差距，通过税收改革等手段进行财富再分配吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持縮小貧富差距，通過稅收改革等手段進行財富再分配嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "富裕と貧困の格差を縮小し、税制改革などを通じて富の再分配を支持しますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持公共教育免费并提供高质量的教育资源吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持公共教育免費並提供高品質的教育資源嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "公共教育を無料で提供し、高品質な教育資源を提供することを支持しますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你认为社会福利系统应该保障基本收入和医疗服务吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你認為社會福利系統應該保障基本收入和醫療服務嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "社会福祉制度は基本的な収入と医療サービスを保障すべきだと思いますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持加强公共交通设施建设，减少私家车使用吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持加強公共交通設施建設，減少私家車使用嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "公共交通施設の建設を強化し、私有車の使用を減少させることを支持しますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你支持提高富人税收来支持社会福利吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你支持提高富人稅收來支持社會福利嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "富裕層への税金を引き上げ、社会福祉を支援することを支持しますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    },

    {

        "zh-CN": {question: "你认为民主制度是最适合保障个人自由和权益的政治体制吗？", options: ["强烈同意", "同意", "不同意", "强烈不同意"]},

        "zh-TW": {question: "你認為民主制度是最適合保障個人自由和權益的政治體制嗎？", options: ["強烈同意", "同意", "不同意", "強烈不同意"]},

        "ja": {question: "民主制度は個人の自由と権利を保障するのに最も適した政治体制だと思いますか？", options: ["強く同意する", "同意する", "同意しない", "強く同意しない"]}

    }

];

// 翻译结果

const results = {

    "zh-CN": "社会主义",

    "zh-TW": "社會主義",

    "ja": "社会主義"

};

// 切换语言

function toggleLanguage() {

    language = language === 'zh-CN' ? 'zh-TW' : language === 'zh-TW' ? 'ja' : 'zh-CN';

    localStorage.setItem('language', language);

    updateUI();

}

// 更新界面内容

function updateUI() {

    document.getElementById('welcome-heading').innerText = language === 'zh-CN' ? "欢迎来到政治意识形态测试" : (language === 'zh-TW' ? "歡迎來到政治意識形態測試" : "政治イデオロギーのテストへようこそ");

    document.getElementById('intro-heading').innerText = language === 'zh-CN' ? "测试说明" : (language === 'zh-TW' ? "測試說明" : "テストの説明");

    document.getElementById('intro-text').innerText = language === 'zh-CN' ? "通过这个测试，我们旨在帮助您了解自己在政治、社会和经济问题上的立场。请根据您的真实想法回答以下问题。" : (language === 'zh-TW' ? "透過這個測試，我們旨在幫助您了解自己在政治、社會和經濟問題上的立場。請根據您的真實想法回答以下問題。" : "このテストでは、政治、社会、経済に関する立場を理解する手助けを目的としています。あなたの本当の考えに基づいて以下の質問に答えてください。");

    document.getElementById('language-span').innerText = language === 'zh-CN' ? '中文' : (language === 'zh-TW' ? '繁體中文' : '日本語');

    loadQuestion();

}

// 加载问题

function loadQuestion() {

    if (currentQuestion < totalQuestions) {

        const questionData = questions[currentQuestion][language];

        document.getElementById('questionText').innerText = questionData.question;

        const optionsContainer = document.getElementById('options-container');

        optionsContainer.innerHTML = '';

        questionData.options.forEach((option, index) => {

            const optionElement = document.createElement('label');

            optionElement.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;

            optionsContainer.appendChild(optionElement);

        });

        document.getElementById('quizSection').style.display = 'block';

        document.getElementById('intro').style.display = 'none';

        document.getElementById('resultSection').style.display = 'none';

    } else {

        showResults();

    }

}

// 下一题

function nextQuestion() {

    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {

        userAnswers[currentQuestion] = parseInt(selectedOption.value);

        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

        currentQuestion++;

        localStorage.setItem('currentQuestion', currentQuestion);

        loadQuestion();

    } else {

        alert(language === 'zh-CN' ? "请先选择一个选项" : (language === 'zh-TW' ? "請先選擇一個選項" : "選択肢を選んでください"));

    }

}

// 显示结果

function showResults() {

    const resultText = language === 'zh-CN' ? "您的政治意识形态是：" : (language === 'zh-TW' ? "您的政治意識形態是：" : "あなたの政治的イデオロギーは：");

    document.getElementById('resultText').innerText = resultText + results[language];

    document.getElementById('quizSection').style.display = 'none';

    document.getElementById('resultSection').style.display = 'block';

}

// 启动测试

function startQuiz() {

    currentQuestion = 0;

    userAnswers = [];

    localStorage.setItem('currentQuestion', currentQuestion);

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    updateUI();

}

updateUI();