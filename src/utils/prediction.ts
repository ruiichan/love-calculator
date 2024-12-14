import type { TestAnswers } from '@/types/common';

// 定义结果类型
export interface PredictionResult {
  score: number;          // 总体匹配分数
  compatibility: number;  // 兼容性评分
  potential: number;      // 发展潜力
  advice: string[];      // 建议列表
  tags: string[];        // 特征标签
}

// 分析答案并生成预测结果
export function analyzePrediction(answers: TestAnswers): PredictionResult {
  let score = 0;
  let compatibility = 0;
  let potential = 0;
  const advice: string[] = [];
  const tags: string[] = [];

  // 基本信息分析
  if (answers[1]) { // 性别
    tags.push(`性别: ${answers[1]}`);
  }

  if (answers[2]) { // 年龄范围
    const ageRange = answers[2] as string;
    tags.push(`年龄: ${ageRange}`);
    
    // 根据年龄段给出建议
    if (ageRange === '18-25岁') {
      advice.push('年轻人要多关注个人成长，不要急于进入关系');
      potential += 80;
    } else if (ageRange === '26-30岁') {
      advice.push('这是寻找长期关系的黄金时期，建议认真对待每一段关系');
      potential += 90;
    } else {
      advice.push('建议在关系中更注重情感交流和共同价值观');
      potential += 85;
    }
  }

  if (answers[3]) { // 感情状态
    const status = answers[3] as string;
    tags.push(`状态: ${status}`);
    
    if (status === '单身') {
      advice.push('保持开放心态，多参加社交活动');
      compatibility += 90;
    } else if (status === '恋爱中') {
      advice.push('珍惜当前关系，持续投入时间和精力');
      compatibility += 70;
    }
  }

  // 性格测评分析
  if (answers[4]) { // 外向程度
    const extroversion = Number(answers[4]);
    compatibility += extroversion * 10;
    
    if (extroversion > 3) {
      tags.push('外向开朗');
      advice.push('善于社交是你的优势，但要注意倾听对方');
    } else {
      tags.push('内向稳重');
      advice.push('多表达自己的想法，增进与对方的了解');
    }
  }

  if (answers[5]) { // 兴趣爱好
    const hobbies = answers[5] as string[];
    tags.push(...hobbies.map(hobby => `爱好: ${hobby}`));
    
    if (hobbies.length > 3) {
      advice.push('丰富的兴趣爱好有助于拓展社交圈');
      potential += 85;
    } else {
      advice.push('可以尝试培养更多兴趣爱好，增加与他人的共同话题');
      potential += 75;
    }
  }

  // 期望分析
  if (answers[6]) { // 期望的关系类型
    const expectation = answers[6] as string;
    tags.push(`期望: ${expectation}`);
    
    if (expectation === '长期稳定关系' || expectation === '婚姻') {
      advice.push('明确的关系目标有助于找到志同道合的伴侣');
      compatibility += 90;
    } else {
      advice.push('建议先明确自己对感情的真实需求');
      compatibility += 70;
    }
  }

  // 计算总分
  score = Math.round((compatibility + potential) / 2);

  // 确保分数在0-100范围内
  score = Math.min(100, Math.max(0, score));
  compatibility = Math.min(100, Math.max(0, compatibility));
  potential = Math.min(100, Math.max(0, potential));

  return {
    score,
    compatibility,
    potential,
    advice,
    tags
  };
}

// 生成匹配建议
export function generateMatchingAdvice(result: PredictionResult): string[] {
  const { score, compatibility, potential } = result;
  const advice: string[] = [];

  // 根据总分给出总体建议
  if (score >= 90) {
    advice.push('你在感情方面有着非常好的基础和潜力');
  } else if (score >= 80) {
    advice.push('你的感情发展前景乐观，继续保持');
  } else if (score >= 70) {
    advice.push('你在感情方面有一定优势，但仍有提升空间');
  } else {
    advice.push('建议多关注自我提升，为感情做好准备');
  }

  // 根据兼容性给出建议
  if (compatibility >= 85) {
    advice.push('你善于处理人际关系，这对感情很有帮助');
  } else if (compatibility >= 70) {
    advice.push('提升沟通技巧可以帮助你更好地维护感情');
  } else {
    advice.push('建议多学习关系经营之道，提升情感智慧');
  }

  // 根据发展潜力给出建议
  if (potential >= 85) {
    advice.push('你的感情发展潜力很大，保持积极心态');
  } else if (potential >= 70) {
    advice.push('通过自我提升，你的感情会有更好的发展');
  } else {
    advice.push('建议先专注于个人成长，感情会水到渠成');
  }

  return advice;
} 