import _ from 'lodash';
// export function postRewards(post) {
//   const { pending_payout_value, total_payout_value, curator_payout_value } = post;
//   let sbdTotal = '';
//   if (pending_payout_value) {
//     return sbdTotal = pending_payout_value.split(' ')[0]
//   } else {
//     // return sbdTotal = Number(_.split( ).split(' ')) + (Number() || 0)
//   }
//   return sbdTotal ? `$${sbdTotal}` : '';
// }

/**
 * Converts a posts rewards to usd. Takes
 * @param post
 */
export function totalPostRewards(post) {
  let total = 0;
  const { pending_payout_value, total_payout_value, curator_payout_value } = post;
  total += parsePayoutAmount(pending_payout_value);
  total += parsePayoutAmount(total_payout_value);
  total += parsePayoutAmount(curator_payout_value);
  return total;
}

export function parsePayoutAmount(amount) {
  return parseFloat(String(amount).replace(/\s[A-Z]*$/, ''));
}

export function formatRewards(amount) {
  return `$${amount.toFixed(2)}`;
}
