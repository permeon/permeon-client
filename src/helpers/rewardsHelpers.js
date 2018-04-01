export function postRewards(post) {
  const { pending_payout_value, total_payout_value, curator_payout_value } = post;
  let sbdTotal = '';
  if (pending_payout_value) {
    return sbdTotal = pending_payout_value.split(' ')[0]
  } else {
    // return sbdTotal = Number(_.split( ).split(' ')) + (Number() || 0)
  }
  return sbdTotal ? `$${sbdTotal}` : '';
}

function parseSBDToNumber(sbd) {
}
