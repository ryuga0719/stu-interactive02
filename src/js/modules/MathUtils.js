/**
 * calculateEuclidDistance
 * 2点間のユークリッド距離を計算
 * @param {number} x1 - ポイント1のマウスのx座標
 * @param {number} y1 - ポイント1のマウスのy座標
 * @param {number} x2 - ポイント2のマウスのx座標
 * @param {number} y2 - ポイント2のマウスのy座標
 * @returns {number} 引数に入れた2点間のユークリッド距離
 */
export const calculateEuclidDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x1 - x2, y1 - y2);
};

/**
 * orgRound
 * valueをbaseに入れた値で四捨五入する
 * @param {number} value - 四捨五入する数値
 * @param {number} base - 四捨五入する桁数(小数第一位なら10を代入)
 * @returns {number} 桁整理した数字
 */
export const orgRound = (value, base) => {
  return Math.round(value * base) / base;
};

/**
 * calculateAcceleration
 * 加速度を算出する
 * @param {number} distance - 区間
 * @param {number} time - 時間
 * @returns {number} 加速度
 */
export const calculateAcceleration = (distance, time) => {
  const acceleration = distance / time;
  return orgRound(acceleration, 10);
};

/**
 * degree2Radian
 * 度数 → ラジアンに変換
 * @param {number} val - 度数
 * @returns {number} ラジアン
 */
export const degree2Radian = (val) => {
  return (val * Math.PI) / 180;
};

/**
 * radian2Degree
 * ラジアン → 度数に変換
 * @param {number} val - ラジアン
 * @returns {number} 度数
 */
export const radian2Degree = (val) => {
  return (val * 180) / Math.PI;
};
