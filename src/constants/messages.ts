export const reminderMessages = [
  "💧 Jal Leejiye, thak gaye honge!!",
  "🥤 Paani break!",
  "🌊 Your body needs water.",
  "💙 Paani peena mat bhooliye!",
  "✨ Ek glass paani bohot kaam aata hai.",
  "🚰 Jal ka chhota sa break lijiye.",
  "🌿 Taza rahiye, hydrated rahiye.",
  "💦 Paani ka samay!",
  "😊 Aapka future self aapko dhanyavaad dega.",
];

export const successMessages = [
  "💙 Great job!",
  "🥳 Awesome!",
  "✨ Keep it up!",
  "🌊 Nicely done!",
  "👏 You're staying healthy!",
  "🚰 That's the spirit!",
  "💪 Hydration unlocked!",
  "😊 Well done!",
  "🎉 Nice one!",
  "🌿 Keep the streak going!",
];

export const drinkWaterMessages = [
  (m: number) => `👋 Maliye ${m} minute${m === 1 ? "" : "s"} ma!`,
  (m: number) => `💧 I'll be back in ${m} minute${m === 1 ? "" : "s"}!`,
  (m: number) => `😊 Stay hydrated! Next reminder in ${m} minute${m === 1 ? "" : "s"}.`,
  (m: number) => `🌊 Aavu ${m} minute${m === 1 ? "" : "s"}!`,
  
];

export const snoozeMessages = [
  "😴 Alright... A few more minutes.",
  "🛌 Take a short break, but don't forget to drink water!",
  "⏰ I'll remind you again soon, stay hydrated!",
  "💤 A little snooze, but remember to drink water!",
  "🕒 I'll be back in a bit, stay hydrated!",
];