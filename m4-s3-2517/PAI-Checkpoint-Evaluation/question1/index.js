function solve(members) {
  const penaltyrates = {
    Gold: 3,
    Silver: 2,
    Platinum: 5,
  };

  const ogpenalties = members.map((ele) => {
    const rate = penaltyrates[ele.membershipType];
    return ele.daysOverdue * rate;
  });

  const totalogpenalty = ogpenalties.reduce((acc, ele) => acc + ele, 0);

  console.log(totalogpenalty)
  console.log(`Original penalties: $${totalogpenalty}`);

  const finalpenalty = members.map((ele, ind) => {
    let penalty = ogpenalties[ind];
    if (ele.isReferral) {
      penalty = penalty/2;
    }
    return Math.min(penalty, 50);
  });

  const totalFinalpenalt = finalpenalty.reduce((acc, ele) => acc + ele,0);

  console.log(
    `Final penalties after referral discount and capping: ${totalFinalpenalt}`
  );
}

const Members = [
  { name: "Arjun", daysOverdue: 2, membershipType: "Gold", isReferral: false },
  { name: "Priya", daysOverdue: 5, membershipType: "Silver", isReferral: true },
  { name: "Nitin", daysOverdue: 1, membershipType: "Gold", isReferral: false },
  {
    name: "Sara",
    daysOverdue: 7,
    membershipType: "Platinum",
    isReferral: false,
  },
];

solve(Members);
