import { Question } from '../types';
import { CATEGORIES } from '../utils/constants';
import { shuffleQuestions as shuffleQuestionsUtil } from '../utils/randomize';

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'หากตัวอักษร A = 1, B = 2, C = 3 แล้ว คำว่า "แมว" มีค่าเท่าไหร่?',
    options: ['15', '18', '21', '24'],
    correctAnswer: 2,
    category: CATEGORIES.GENERAL,
    explanation: 'ม=13, แ=1, ว=7 รวมกัน = 13+1+7 = 21',
  },
  {
    id: 2,
    text: 'อะไรมาต่อไปในลำดับ: 2, 6, 12, 20, ?',
    options: ['28', '30', '32', '36'],
    correctAnswer: 1,
    category: CATEGORIES.GENERAL,
    explanation: 'รูปแบบคือ n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30',
  },
  {
    id: 3,
    text: 'คำไหนไม่เข้าพวก: แอปเปิ้ล, ส้ม, กล้วย, รถยนต์, องุ่น?',
    options: ['แอปเปิ้ล', 'ส้ม', 'รถยนต์', 'องุ่น'],
    correctAnswer: 2,
    category: CATEGORIES.GENERAL,
    explanation: 'รถยนต์เป็นสิ่งเดียวที่ไม่ใช่ผลไม้',
  },
  {
    id: 4,
    text: 'หากจัดเรียงตัวอักษร "ดีใจ" ใหม่ จะได้คำว่าอะไร?',
    options: ['ใจดี', 'จีใด', 'ดีจ่าย', 'ใจดิ'],
    correctAnswer: 0,
    category: CATEGORIES.GENERAL,
    explanation: 'จัดเรียงตัวอักษร "ดีใจ" ใหม่ได้ "ใจดี"',
  },
  {
    id: 5,
    text: 'ตัวเลขที่หายไป: 3, 7, 15, 31, ?',
    options: ['47', '63', '55', '71'],
    correctAnswer: 1,
    category: CATEGORIES.GENERAL,
    explanation: 'แต่ละตัวเลขคูณ 2 แล้วบวก 1: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63',
  },
  {
    id: 6,
    text: 'หากนาฬิกาแสดงเวลา 3:15 มุมระหว่างเข็มชั่วโมงและเข็มนาทีเป็นกี่องศา?',
    options: ['7.5°', '15°', '22.5°', '30°'],
    correctAnswer: 0,
    category: CATEGORIES.SCIENCE,
    explanation: 'เวลา 3:15 เข็มนาทีอยู่ที่ 90° เข็มชั่วโมงอยู่ที่ 97.5° ผลต่างคือ 7.5°',
  },
  {
    id: 7,
    text: '25% ของ 80% ของ 200 เท่ากับเท่าไหร่?',
    options: ['30', '40', '50', '60'],
    correctAnswer: 1,
    category: CATEGORIES.SCIENCE,
    explanation: '80% ของ 200 = 160, แล้ว 25% ของ 160 = 40',
  },
  {
    id: 8,
    text: 'ดาวห้าแฉก (pentagram) มีสามเหลี่ยมทั้งหมดกี่รูป?',
    options: ['5', '10', '15', '35'],
    correctAnswer: 3,
    category: CATEGORIES.SCIENCE,
    explanation: 'ดาวห้าแฉกมีสามเหลี่ยมทั้งหมด 35 รูปเมื่อนับทุกขนาดที่เกิดจากการตัดกัน',
  },
  {
    id: 9,
    text: 'หาก x² + y² = 25 และ x + y = 7 แล้ว xy เท่ากับเท่าไหร่?',
    options: ['12', '24', '6', '18'],
    correctAnswer: 0,
    category: CATEGORIES.SCIENCE,
    explanation: '(x+y)² = x² + 2xy + y², ดังนั้น 49 = 25 + 2xy, จึง xy = 12',
  },
  {
    id: 10,
    text: 'จำนวนเฉพาะตัวถัดไปหลัง 29 คือเท่าไหร่?',
    options: ['31', '33', '37', '39'],
    correctAnswer: 0,
    category: CATEGORIES.SCIENCE,
    explanation: '31 เป็นจำนวนเฉพาะตัวถัดไปหลัง 29',
  },
  {
    id: 11,
    text: 'อะไรมาต่อไป: ○, ●, ○○, ●●, ○○○, ?',
    options: ['●●●', '○●○', '●○●', '○○○○'],
    correctAnswer: 0,
    category: CATEGORIES.HISTORY,
    explanation: 'รูปแบบสลับระหว่างวงกลมกลวงและทึบ เพิ่มจำนวน: 1,1,2,2,3,3',
  },
  {
    id: 12,
    text: 'เติมคำในการเปรียบเทียบ: หนังสือ เทียบกับ การอ่าน เหมือนกับ ส้อม เทียบกับ ?',
    options: ['ครัว', 'การกิน', 'ช้อน', 'อาหาร'],
    correctAnswer: 1,
    category: CATEGORIES.HISTORY,
    explanation: 'หนังสือใช้สำหรับอ่าน เหมือนกับส้อมใช้สำหรับกิน',
  },
  {
    id: 13,
    text: 'ตัวเลขใดควรมาแทนเครื่องหมายคำถาม: 2, 3, 5, 8, 13, ?',
    options: ['18', '21', '20', '19'],
    correctAnswer: 1,
    category: CATEGORIES.HISTORY,
    explanation: 'นี่คือลำดับฟีโบนัชชี: แต่ละตัวเลขเป็นผลรวมของสองตัวก่อนหน้า 8+13=21',
  },
  {
    id: 14,
    text: 'หาก วันจันทร์ = 123456 แล้ว วนัจร คือเท่าไหร่?',
    options: ['631452', '612453', '641523', '651432'],
    correctAnswer: 0,
    category: CATEGORIES.HISTORY,
    explanation: 'ว=6, น=3, ั=1, จ=4, ร=5, ดังนั้น วนัจร = 631452',
  },
  {
    id: 15,
    text: 'รูปทรงใดแตกต่างจากพวก: สี่เหลี่ยมจัตุรัส, สามเหลี่ยม, วงกลม, สี่เหลี่ยมผืนผ้า, หกเหลี่ยม?',
    options: ['สี่เหลี่ยมจัตุรัส', 'สามเหลี่ยม', 'วงกลม', 'หกเหลี่ยม'],
    correctAnswer: 2,
    category: CATEGORIES.HISTORY,
    explanation: 'วงกลมเป็นรูปเดียวที่ไม่มีเส้นตรง',
  },
  {
    id: 16,
    text: 'ต้องใช้ลูกบาศก์เล็กกี่ลูกในการสร้างลูกบาศก์ขนาด 3×3×3?',
    options: ['9', '18', '27', '36'],
    correctAnswer: 2,
    category: CATEGORIES.GEOGRAPHY,
    explanation: '3×3×3 = 27 ลูกบาศก์เล็กที่จำเป็นในการสร้างลูกบาศก์ 3×3×3',
  },
  {
    id: 17,
    text: 'หากพับกระดาษครึ่งหนึ่ง 3 ครั้ง จะได้กี่ส่วน?',
    options: ['6', '8', '9', '12'],
    correctAnswer: 1,
    category: CATEGORIES.GEOGRAPHY,
    explanation: 'การพับแต่ละครั้งทำให้ส่วนเพิ่มเป็นสองเท่า: 1→2→4→8 ส่วนหลัง 3 ครั้ง',
  },
  {
    id: 18,
    text: 'กระจกสะท้อนสิ่งที่เราเขียน ตัวอักษรใดดูเหมือนเดิมในกระจก?',
    options: ['A', 'B', 'C', 'F'],
    correctAnswer: 0,
    category: CATEGORIES.GEOGRAPHY,
    explanation: 'ตัวอักษร A มีความสมมาตรและดูเหมือนเดิมเมื่อสะท้อนในกระจก',
  },
  {
    id: 19,
    text: 'ลูกบาศก์มีขอบกี่เส้น?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 3,
    category: CATEGORIES.GEOGRAPHY,
    explanation: 'ลูกบาศก์มี 12 ขอบ: 4 ขอบด้านบน, 4 ขอบด้านล่าง, และ 4 ขอบเชื่อมระหว่างบนและล่าง',
  },
  {
    id: 20,
    text: 'หากหั่นพิซซ่าเป็น 8 ชิ้นเท่าๆ กัน และกินไป 3 ชิ้น เหลือเศษส่วนเท่าไหร่?',
    options: ['3/8', '5/8', '1/2', '2/3'],
    correctAnswer: 1,
    category: CATEGORIES.GEOGRAPHY,
    explanation: 'หากกิน 3 ชิ้นจาก 8 ชิ้น เหลือ 5 ชิ้น ซึ่งเป็น 5/8 ของพิซซ่า',
  },
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return MOCK_QUESTIONS.filter(q => q.category === category);
};

export const getRandomQuestions = (): Question[] => {
  console.log('getRandomQuestions called');
  console.log('MOCK_QUESTIONS length:', MOCK_QUESTIONS.length);
  
  if (!MOCK_QUESTIONS || MOCK_QUESTIONS.length === 0) {
    console.error('MOCK_QUESTIONS is empty or undefined');
    return [];
  }
  
  const categories = Object.values(CATEGORIES);
  console.log('Categories:', categories);
  
  const selectedQuestions: Question[] = [];
  
  categories.forEach(category => {
    const categoryQuestions = getQuestionsByCategory(category);
    console.log(`Category ${category}: ${categoryQuestions.length} questions`);
    selectedQuestions.push(...categoryQuestions);
  });
  
  console.log('Total selected questions:', selectedQuestions.length);
  
  if (selectedQuestions.length === 0) {
    console.error('No questions selected from any category');
    return MOCK_QUESTIONS.slice(0, 20);
  }
  
  const shuffled = shuffleArray(selectedQuestions);
  console.log('Shuffled questions:', shuffled.length);
  
  return shuffled;
};

export const shuffleQuestions = shuffleQuestionsUtil;
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};