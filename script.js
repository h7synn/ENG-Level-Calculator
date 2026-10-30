/* ================= DATA: 20-question level test ================= */
const LEVELS = ['A1','A2','B1','B2','C1'];
const LEVEL_WEIGHT = {A1:1,A2:2,B1:3,B2:4,C1:5};
const LEVEL_TITLES = {
  A1:'Başlangıç Seviyesi', A2:'Temel Seviye', B1:'Orta Seviye',
  B2:'Orta-Üstü Seviye', C1:'İleri Seviye'
};
const LEVEL_DESC = {
  A1:'Çok temel kalıpları ve günlük ifadeleri tanıyorsun. Kendini basit cümlelerle tanıtabilir, temel ihtiyaçlarını ifade edebilirsin. Şimdi hedef: temel fiil çekimleri ve günlük kelime dağarcığını sağlamlaştırmak.',
  A2:'Günlük konularda basit ve doğrudan cümleler kurabiliyorsun. Geçmiş zaman ve karşılaştırma yapıları henüz tam oturmamış olabilir. Şimdi hedef: zaman kiplerini (geçmiş, gelecek) rahat kullanmak.',
  B1:'Tanıdık konularda akıcı iletişim kurabiliyor, görüş belirtebiliyorsun. Present perfect ve koşul cümleleri gibi yapılarda küçük aksaklıklar olabilir. Şimdi hedef: bağlaçlarla daha uzun ve bağlantılı cümleler kurmak.',
  B2:'Karmaşık metinleri anlayabiliyor, soyut konularda tartışabiliyorsun. Edilgen çatı ve üçüncü koşul gibi ileri yapılarda ince hatalar olabilir. Şimdi hedef: akademik/profesyonel kelime dağarcığını genişletmek.',
  C1:'Dili esnek ve etkili biçimde kullanabiliyorsun; ince anlam farklarını ayırt edebiliyorsun. Şimdi hedef: deyimsel ifadeler, devrik yapılar ve üslup inceliklerinde ustalaşmak.'
};

const QUESTIONS = [
  {level:'A1', tag:'Dilbilgisi', q:'I ___ a student.', opts:['am','is','are','be'], correct:0},
  {level:'A1', tag:'Dilbilgisi', q:'This is my dog. ___ name is Max.', opts:['Its',"It's",'His','Their'], correct:0},
  {level:'A1', tag:'Kelime', q:'What color is a banana?', opts:['Yellow','Blue','Purple','Black'], correct:0},
  {level:'A1', tag:'Dilbilgisi', q:'She ___ to school every day.', opts:['go','goes','going','gone'], correct:1},

  {level:'A2', tag:'Dilbilgisi', q:'Yesterday, I ___ to the cinema.', opts:['go','went','goed','gone'], correct:1},
  {level:'A2', tag:'Dilbilgisi', q:'There ___ some milk in the fridge.', opts:['is','are','be','am'], correct:0},
  {level:'A2', tag:'Dilbilgisi', q:'This book is ___ than that one.', opts:['interesting','more interesting','most interesting','interestinger'], correct:1},
  {level:'A2', tag:'Dilbilgisi', q:'We arrived ___ the airport at 6 pm.', opts:['in','at','on','to'], correct:1},

  {level:'B1', tag:'Dilbilgisi', q:'I ___ never been to Japan.', opts:['have','has','had','having'], correct:0},
  {level:'B1', tag:'Dilbilgisi', q:'If it rains tomorrow, we ___ the picnic.', opts:['cancel','will cancel','would cancel','canceled'], correct:1},
  {level:'B1', tag:'Dilbilgisi', q:'You ___ study harder if you want to pass.', opts:['should','must have','could have','would'], correct:0},
  {level:'B1', tag:'Kelime', q:'Choose the word closest in meaning to "huge":', opts:['tiny','enormous','quiet','cheap'], correct:1},

  {level:'B2', tag:'Dilbilgisi', q:'The bridge ___ in 1930.', opts:['built','was built','has built','is building'], correct:1},
  {level:'B2', tag:'Dilbilgisi', q:'If she had studied, she ___ the exam.', opts:['would pass','would have passed','will pass','passed'], correct:1},
  {level:'B2', tag:'Kelime', q:'Which phrasal verb means "postpone"?', opts:['put off','put up','put on','put down'], correct:0},
  {level:'B2', tag:'Dilbilgisi', q:'The man ___ car was stolen called the police.', opts:['who','whose','which','whom'], correct:1},

  {level:'C1', tag:'Dilbilgisi', q:'Never ___ such a beautiful sunset.', opts:['I have seen','have I seen','I saw','did I saw'], correct:1},
  {level:'C1', tag:'Dilbilgisi', q:'It is essential that he ___ on time.', opts:['is','be','was','being'], correct:1},
  {level:'C1', tag:'Kelime', q:'Choose the word closest in meaning to "meticulous":', opts:['careless','careful and precise','fast','lazy'], correct:1},
  {level:'C1', tag:'Kelime', q:'She decided to ___ and finish the project despite the difficulties.', opts:['give up','carry on','back down','let go'], correct:1},
];

/* ================= DATA: adaptive practice bank ================= */
const PRACTICE_BANK = {
  A1:[
    {prompt:'Kendini İngilizce olarak tanıt: adın, yaşın ve nereli olduğunu yaz. ("My name is..." ile başla.)',
     minWords:6,
     expect:[{re:/\bmy name is\b/i, label:'tanıtım kalıbı', w:25, hint:'"My name is..." ile başlamayı unutma.'},
             {re:/\bI (am|\'m)\b/i, label:'"I am" kullanımı', w:20, hint:'Kendinden bahsederken "I am" ya da "I\'m" kullan.'},
             {re:/\bfrom\b/i, label:'nereli olduğunu belirtme', w:15, hint:'"I am from..." ile nereli olduğunu ekle.'}],
     ban:[], sample:"My name is Ayşe. I am 21 years old. I am from Istanbul."},
    {prompt:'Sevdiğin bir yiyeceği anlat: "I like..." kalıbını kullanarak 2 cümle yaz.',
     minWords:6,
     expect:[{re:/\bI like\b/i, label:'"I like" kalıbı', w:30, hint:'Cümlene "I like..." ile başla.'},
             {re:/\bbecause\b/i, label:'sebep bildirme', w:20, hint:'"because" ile neden sevdiğini ekleyebilirsin.'}],
     ban:[], sample:"I like pizza because it is delicious."},
    {prompt:'Bugün hava nasıl? "It is..." kalıbıyla bir cümle yaz.',
     minWords:4,
     expect:[{re:/\bit (is|\'s)\b/i, label:'"It is" kalıbı', w:35, hint:'"It is sunny/cold/rainy" gibi bir kalıp kullan.'}],
     ban:[], sample:"It is sunny today."}
  ],
  A2:[
    {prompt:'Günlük rutinini anlat. Present simple ve zaman zarfları (usually, every day) kullan.',
     minWords:10,
     expect:[{re:/\b(usually|often|every day|always|sometimes)\b/i, label:'zaman zarfı', w:25, hint:'"usually", "every day" gibi bir zaman zarfı ekle.'},
             {re:/\b(get up|go|have|start|finish)\b/i, label:'rutin fiil', w:20, hint:'Günlük rutin fiilleri (get up, go, have) kullan.'}],
     ban:[{re:/\bi am go\b/i, label:'yanlış yapı', w:20, hint:'"I am go" yanlış; "I go" doğru kullanım.'}],
     sample:"I usually get up at seven, have breakfast, and go to work by bus."},
    {prompt:'Geçen hafta sonu ne yaptığını geçmiş zamanla (past simple) anlat.',
     minWords:8,
     expect:[{re:/\b(went|watched|visited|played|met|had|saw|stayed)\b/i, label:'past simple fiil', w:30, hint:'"went", "watched", "visited" gibi past simple fiiller kullan.'},
             {re:/\blast (weekend|week)\b/i, label:'zaman ifadesi', w:15, hint:'"last weekend" gibi bir zaman ifadesi ekle.'}],
     ban:[{re:/\bgoed\b/i, label:'yanlış çekim', w:25, hint:'"goed" yanlıştır, doğrusu "went".'}],
     sample:"Last weekend, I went to the cinema and watched a new movie."},
    {prompt:'İki şehri karşılaştır (comparative yapı kullan: bigger, more beautiful vb.)',
     minWords:8,
     expect:[{re:/\b(more|er)\b/i, label:'karşılaştırma yapısı', w:30, hint:'"more interesting" veya "bigger" gibi bir karşılaştırma kullan.'},
             {re:/\bthan\b/i, label:'"than" kullanımı', w:20, hint:'Karşılaştırmadan sonra "than" kullanmayı unutma.'}],
     ban:[], sample:"Istanbul is bigger than Ankara, but Ankara is quieter."}
  ],
  B1:[
    {prompt:'Hiç yapmadığın bir şeyi present perfect ile anlat ("I have never...").',
     minWords:8,
     expect:[{re:/\bhave (never )?\w+ed\b|\bhave (never )?(been|seen|done|gone|had)\b/i, label:'present perfect yapısı', w:35, hint:'"I have never been to..." gibi present perfect kullan.'},
             {re:/\bnever\b/i, label:'"never" kullanımı', w:15, hint:'"never" kelimesini eklemeyi unutma.'}],
     ban:[], sample:"I have never been to Japan, but I would love to visit someday."},
    {prompt:'Bir koşul cümlesi kur: "If I have free time this weekend, I will..."',
     minWords:8,
     expect:[{re:/\bif\b/i, label:'"if" bağlacı', w:20, hint:'Cümleye "if" ile başla.'},
             {re:/\bwill\b/i, label:'"will" kullanımı', w:25, hint:'Sonuç cümlesinde "will" kullan (first conditional).'}],
     ban:[{re:/\bif i will\b/i, label:'yanlış koşul yapısı', w:25, hint:'"if" cümlesinde "will" kullanılmaz: "If I have..." doğru.'}],
     sample:"If I have free time this weekend, I will visit my grandparents."},
    {prompt:'"enormous" kelimesini kullanarak bir cümle kur.',
     minWords:5,
     expect:[{re:/\benormous\b/i, label:'"enormous" kullanımı', w:50, hint:'Cümlede "enormous" kelimesini geçirmeyi unutma.'}],
     ban:[], sample:"The new shopping mall is enormous compared to the old one."}
  ],
  B2:[
    {prompt:'Bir olayı edilgen çatı (passive voice) ile anlat: "The ... was built/made/discovered..."',
     minWords:8,
     expect:[{re:/\b(was|were|is|are|has been|have been)\s+\w+ed\b/i, label:'edilgen çatı', w:40, hint:'"was built", "has been discovered" gibi passive yapı kullan.'}],
     ban:[], sample:"The Eiffel Tower was built in 1889 by Gustave Eiffel."},
    {prompt:'Geçmişte yapmadığın bir şeyin sonucunu üçüncü koşul (third conditional) ile anlat.',
     minWords:8,
     expect:[{re:/\bif\b/i, label:'"if" bağlacı', w:15, hint:'"If I had..." ile başla.'},
             {re:/\bhad\s+\w+ed\b|\bhad\s+(been|gone|done|seen)\b/i, label:'"had + past participle"', w:25, hint:'"if" cümlesinde "had + V3" kullan.'},
             {re:/\bwould have\b/i, label:'"would have + V3"', w:25, hint:'Sonuç cümlesinde "would have + V3" kullan.'}],
     ban:[], sample:"If I had studied harder, I would have passed the exam."},
    {prompt:'"put off" phrasal verb\'ünü kullanarak bir cümle yaz.',
     minWords:6,
     expect:[{re:/\bput off\b/i, label:'"put off" kullanımı', w:50, hint:'"put off" ifadesini cümleye ekle.'}],
     ban:[], sample:"We had to put off the meeting until next week."}
  ],
  C1:[
    {prompt:'Devrik cümle (inversion) kullanarak bir deneyimini anlat: "Never have I..."',
     minWords:6,
     expect:[{re:/^never\s+(have|had|did|will)\b/i, label:'devrik yapı (inversion)', w:45, hint:'Cümleye "Never have I..." gibi devrik yapı ile başla.'}],
     ban:[], sample:"Never have I seen such a breathtaking view."},
    {prompt:'"It is essential/vital that..." kalıbıyla subjunctive (dilek kipi) kullanarak bir cümle kur.',
     minWords:8,
     expect:[{re:/\bit is (essential|vital|important|crucial) that\b/i, label:'subjunctive kalıbı', w:30, hint:'"It is essential that..." ile başla.'},
             {re:/\bthat (he|she|it|they|we|you)\s+be\b/i, label:'"that + subject + be"', w:30, hint:'Subjunctive yapıda fiil "be" halinde kalır: "that he be on time".'}],
     ban:[], sample:"It is essential that everyone be on time for the meeting."},
    {prompt:'"meticulous" kelimesini bağlama uygun şekilde kullanarak bir cümle yaz.',
     minWords:6,
     expect:[{re:/\bmeticulous\b/i, label:'"meticulous" kullanımı', w:50, hint:'"meticulous" kelimesini uygun bağlamda kullan.'}],
     ban:[], sample:"Her meticulous attention to detail made the report flawless."}
  ]
};

/* ================= STATE ================= */
let state = {
  qIndex:0,
  answers:[],
  score:0,
  maxScore: QUESTIONS.reduce((s,q)=>s+LEVEL_WEIGHT[q.level],0),
  resultLevel:null,
  practiceLevel:null,
  practicePointer:{},
  history:[],   // last few scores for adaptive engine
  sessionScores:[]
};

/* ================= LADDER GAUGE ================= */
function renderLadder(activeIdx, litUpTo){
  const bar = document.getElementById('ladderBar');
  const labels = document.getElementById('ladderLabels');
  bar.innerHTML = '';
  labels.innerHTML = '';
  LEVELS.forEach((lv, i)=>{
    const rung = document.createElement('div');
    rung.className = 'rung' + (i<=litUpTo ? ' lit':'');
    bar.appendChild(rung);
    const lab = document.createElement('span');
    lab.textContent = lv;
    if(i===activeIdx) lab.classList.add('active');
    labels.appendChild(lab);
  });
  document.getElementById('ladderWrap').style.display='flex';
}

/* ================= QUIZ ================= */
function startQuiz(){
  show('screen-quiz');
  document.getElementById('brandStep').textContent = 'Seviye Testi';
  renderLadder(0,-1);
  renderQuestion();
}

function renderQuestion(){
  const q = QUESTIONS[state.qIndex];
  document.getElementById('quizProgress').textContent = `Soru ${state.qIndex+1}/${QUESTIONS.length}`;
  document.getElementById('quizTag').textContent = q.tag + ' · ' + q.level;
  document.getElementById('quizText').textContent = q.q;
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  q.opts.forEach((opt, i)=>{
    const b = document.createElement('button');
    b.className = 'opt';
    b.textContent = opt;
    b.onclick = ()=>selectOption(i);
    optWrap.appendChild(b);
  });
  // live ladder estimate based on running weighted score so far
  const litIdx = Math.min(4, Math.floor((state.score / Math.max(1,state.maxScore)) * 5));
  renderLadder(Math.min(4,Math.floor(state.qIndex/4)), litIdx-1);
}

function selectOption(i){
  const q = QUESTIONS[state.qIndex];
  const buttons = document.querySelectorAll('#quizOptions .opt');
  buttons.forEach(b=>b.disabled=true);
  buttons[q.correct].classList.add('correct');
  if(i!==q.correct) buttons[i].classList.add('wrong');
  const correct = (i===q.correct);
  state.answers.push({level:q.level, correct});
  if(correct) state.score += LEVEL_WEIGHT[q.level];

  setTimeout(()=>{
    state.qIndex++;
    if(state.qIndex < QUESTIONS.length){
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 650);
}

function finishQuiz(){
  const pct = state.score / state.maxScore;
  const level = pct < 0.26 ? 'A1' : pct < 0.46 ? 'A2' : pct < 0.66 ? 'B1' : pct < 0.84 ? 'B2' : 'C1';
  state.resultLevel = level;
  state.practiceLevel = level;
  renderResult();
}

function renderResult(){
  show('screen-result');
  document.getElementById('brandStep').textContent = 'Sonuç';
  const lvIdx = LEVELS.indexOf(state.resultLevel);
  renderLadder(lvIdx, lvIdx);

  document.getElementById('resultBadge').textContent = state.resultLevel;
  document.getElementById('resultTitle').textContent = LEVEL_TITLES[state.resultLevel];
  const correctCount = state.answers.filter(a=>a.correct).length;
  document.getElementById('resultSub').textContent = `${QUESTIONS.length} sorudan ${correctCount} doğru`;
  document.getElementById('resultDesc').textContent = LEVEL_DESC[state.resultLevel];

  const bySkill = {};
  QUESTIONS.forEach((q,i)=>{
    const cat = q.tag;
    bySkill[cat] = bySkill[cat] || {correct:0,total:0};
    bySkill[cat].total++;
    if(state.answers[i].correct) bySkill[cat].correct++;
  });
  const statWrap = document.getElementById('resultStats');
  statWrap.innerHTML='';
  Object.keys(bySkill).forEach(cat=>{
    const s = bySkill[cat];
    const div = document.createElement('div');
    div.className='stat';
    div.innerHTML = `<b>${s.correct}/${s.total}</b><span>${cat}</span>`;
    statWrap.appendChild(div);
  });
}

/* ================= PRACTICE ================= */
function startPractice(){
  show('screen-practice');
  document.getElementById('brandStep').textContent = 'Çalışma Odası';
  state.practicePointer = {};
  state.history = [];
  state.sessionScores = [];
  document.getElementById('practiceLog').innerHTML='';
  askNextPracticeQuestion();
}

function pickPracticeQuestion(){
  const lv = state.practiceLevel;
  const bank = PRACTICE_BANK[lv];
  const ptr = state.practicePointer[lv] || 0;
  const q = bank[ptr % bank.length];
  state.practicePointer[lv] = ptr + 1;
  return q;
}

function askNextPracticeQuestion(){
  const lvIdx = LEVELS.indexOf(state.practiceLevel);
  renderLadder(lvIdx, lvIdx);
  const q = pickPracticeQuestion();
  state.currentPracticeQ = q;
  const log = document.getElementById('practiceLog');
  const bubble = document.createElement('div');
  bubble.className='bubble ai';
  bubble.innerHTML = `<span class="who">Eğitmen · ${state.practiceLevel} seviyesi</span>${q.prompt}`;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
  document.getElementById('answerBox').value='';
  document.getElementById('answerBox').focus();
}

function evaluate(text, q){
  const words = text.trim().split(/\s+/).filter(Boolean);
  let score = 40;
  let matched = [], missing = [], issues = [];
  let highlighted = escapeHtml(text);

  q.expect.forEach(rule=>{
    if(rule.re.test(text)){
      score += rule.w;
      matched.push(rule.label);
      highlighted = highlighted.replace(new RegExp(rule.re.source, rule.re.flags.includes('g')?rule.re.flags:rule.re.flags+'g'),
        m=>`<span class="hit">${escapeHtml(m)}</span>`);
    } else {
      missing.push(rule);
    }
  });
  (q.ban||[]).forEach(rule=>{
    if(rule.re.test(text)){
      score -= rule.w;
      issues.push(rule.hint);
      highlighted = highlighted.replace(new RegExp(rule.re.source, rule.re.flags.includes('g')?rule.re.flags:rule.re.flags+'g'),
        m=>`<span class="miss">${escapeHtml(m)}</span>`);
    }
  });

  if(words.length < q.minWords){
    score -= 15;
    issues.push(`Cümlen biraz kısa kaldı, en az ${q.minWords} kelime kullanmayı dene.`);
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const suggestions = missing.map(m=>m.hint).concat(issues).filter(Boolean);
  if(suggestions.length===0) suggestions.push('Harika! Beklenen yapıları doğru şekilde kullandın.');

  return {score, highlighted, suggestions, matched};
}

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function submitAnswer(){
  const box = document.getElementById('answerBox');
  const text = box.value.trim();
  if(!text) return;
  const q = state.currentPracticeQ;
  const result = evaluate(text, q);
  state.sessionScores.push(result.score);
  state.history.push(result.score);
  if(state.history.length>2) state.history.shift();

  const log = document.getElementById('practiceLog');
  const bubble = document.createElement('div');
  bubble.className='bubble feedback';
  const sampleId = 'sample_'+Date.now();
  bubble.innerHTML = `
    <span class="who">Değerlendirme <span class="score-pill">${result.score}/100</span></span>
    <div class="answer-echo">${result.highlighted}</div>
    <ul class="suggestions">${result.suggestions.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ul>
    <button class="sample-toggle" onclick="toggleSample('${sampleId}')">Örnek cevabı gör</button>
    <div class="sample-answer" id="${sampleId}">${escapeHtml(q.sample)}</div>
  `;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;

  updateSessionAvg();
  adjustLevel();
  box.value='';
  setTimeout(askNextPracticeQuestion, 300);
}

function toggleSample(id){
  document.getElementById(id).classList.toggle('show');
}

function updateSessionAvg(){
  const avg = Math.round(state.sessionScores.reduce((a,b)=>a+b,0)/state.sessionScores.length);
  document.getElementById('sessAvg').textContent = avg;
}

function adjustLevel(){
  if(state.history.length<2) return;
  const avg = state.history.reduce((a,b)=>a+b,0)/state.history.length;
  const idx = LEVELS.indexOf(state.practiceLevel);
  if(avg>=78 && idx<LEVELS.length-1){
    state.practiceLevel = LEVELS[idx+1];
    state.history=[];
  } else if(avg<38 && idx>0){
    state.practiceLevel = LEVELS[idx-1];
    state.history=[];
  }
}

function endSession(){
  const log = document.getElementById('practiceLog');
  const avg = state.sessionScores.length ? Math.round(state.sessionScores.reduce((a,b)=>a+b,0)/state.sessionScores.length) : 0;
  const bubble = document.createElement('div');
  bubble.className='bubble ai';
  bubble.innerHTML = `<span class="who">Oturum Özeti</span>
    ${state.sessionScores.length} soru cevapladın, ortalama puanın <b>${avg}/100</b>.
    Şu anki çalışma seviyen: <b>${state.practiceLevel}</b>. İstediğin zaman devam edebilirsin.`;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
}

/* ================= NAV ================= */
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function restartAll(){
  state = {
    qIndex:0, answers:[], score:0,
    maxScore: QUESTIONS.reduce((s,q)=>s+LEVEL_WEIGHT[q.level],0),
    resultLevel:null, practiceLevel:null, practicePointer:{}, history:[], sessionScores:[]
  };
  document.getElementById('ladderWrap').style.display='none';
  document.getElementById('brandStep').textContent='Başlangıç';
  show('screen-start');
}
