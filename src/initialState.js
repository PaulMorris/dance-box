export const initialState = {
  uiState: {
      // mode can be dances or editDance
      mode: 'dances',
      currentDance: ''
  },
  dances: {},
  danceMenusData: {
      type: [
          {value: 'Contra', label: 'Contra', default: true},
          {value: 'Square', label: 'Square'},
          {value: 'CircleMixer', label: 'Circle Mixer'},
          {value: 'ScatterMixer', label: 'Scatter Mixer'},
          {value: 'Longways', label: 'Longways'},
          {value: 'EnglishCountry', label: 'English Country'},
          {value: 'Other', label: 'Other'}
      ],
      form: [
          {value: 'Improper', label: 'Improper', default: true},
          {value: 'Proper', label: 'Proper'},
          {value: 'Becket', label: 'Becket'},
          {value: 'Indecent', label: 'Indecent'}
      ],
      formation: [
          {value: 'Duple Minor', label: 'Duple Minor', default: true},
          {value: 'Triple Minor', label: 'Triple Minor'},
          {value: 'Triplet', label: 'Triplet'},
          {value: 'Quadruplet', label: 'Quadruplet'},
          {value: 'Four Facing Four', label: 'Four Facing Four'},
          {value: 'Tempest', label: 'Tempest'},
          {value: 'Square', label: 'Square'},
          {value: 'Break', label: 'Break'},
          {value: 'Other', label: 'Other'}
      ],
      progression: [
          {value: 'Single Progression', label: 'Single Progression', default: true},
          {value: 'Double Progression', label: 'Double Progression'},
          {value: 'Triple Progression', label: 'Triple Progression'},
          {value: 'Quadruple Progression', label: 'Quadruple Progression'}
      ],
      level: [
          {value: 'Level Unset', label: 'Level Unset', default: true},
          {value: 'Beginner', label: 'Beginner Level'},
          {value: 'Novice', label: 'Novice Level'},
          {value: 'Intermediate', label: 'Intermediate Level'},
          {value: 'Advanced', label: 'Advanced Level'}
      ],
      mixedLevel: [
          {value: 'Mixed Level Unset', label: 'Mixed Level Unset', default: true},
          {value: 'Mixed Level Friendly', label: 'Mixed Level Friendly'},
          {value: 'Mixed Level Unfriendly', label: 'Mixed Level Unfriendly'}
      ],
      rating: [
          {value: '', label: 'Rating Unset', default: true},
          {value: 1, label: 'Rating: 1'},
          {value: 2, label: 'Rating: 2'},
          {value: 3, label: 'Rating: 3'},
          {value: 4, label: 'Rating: 4'},
          {value: 5, label: 'Rating: 5'}
      ]
  },

  figureTypes: {
      'Allemande': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          hand: [
              {value: 'Right', label: 'Right Hand', default: true},
              {value: 'Left', label: 'Left Hand'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Balance': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'TheRing', label: 'The Ring'},
              {value: 'TheWave', label: 'The Wave'},
              {value: 'TheLine', label: 'The Line'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Balance and Swing': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      'Box Circulate': {
          who: [
              {value: 'GentsCrossLadiesTurn', label: 'Gents Cross, Ladies Turn', default: true},
              {value: 'LadiesCrossGentsTurn', label: 'Ladies Cross, Gents Turn'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Box the Gnat': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Butterfly Whirl': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 4 Beats'}
          ]
      },
      'California Twirl': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Cast Off': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Chain': {
          who: [
              {value: 'Ladies', label: 'Ladies', default: true},
              {value: 'Gents', label: 'Gents'}
          ],
          direction: [
              {value: 'Across', label: 'Across the Set', default: true},
              {value: 'Side', label: 'Side of the Set'},
              {value: 'LeftDiagonal', label: 'Left Diagonal'},
              {value: 'RightDiagonal', label: 'Right Diagonal'}
          ],
          duration: [
              {value: 8, label: 'For 4 Beats', default: true}
          ]
      },
      'Circle': {
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          howFar: [
              {value: 1, label: '1 Place'},
              {value: 2, label: '2 Places'},
              {value: 3, label: '3 Places'},
              {value: 4, label: '4 Places', default: true},
              {value: 5, label: '5 Places'},
              {value: 6, label: '6 Places'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats', default: true},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Contra Corners': {
          who: [
              {value: 'Ones', label: 'Ones', default: true},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      'Courtesy Turn': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Cross': {
          who: [
              {value: 'Ones', label: 'Ones', default: true},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Do Si Do': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          howFar: [
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Figure Eight': {
          who: [
              {value: 'Ones', label: 'Ones', default: true},
              {value: 'Twos', label: 'Twos',}
          ],
          direction: [
              {value: 'Above', label: 'Above', default: true},
              {value: 'Below', label: 'Below'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Give and Take': {
          who: [
              {value: 'GentsTake', label: 'Gents Take', default: true},
              {value: 'LadiesTake', label: 'Ladies Take'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Gypsy': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          hand: [
              {value: 'Right', label: 'By the Right', default: true},
              {value: 'Left', label: 'By the Left'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Hey': {
          howFar: [
              {value: 1, label: 'Full Hey', default: true},
              {value: 0.5, label: 'Half Hey'}
          ],
          who: [
              {value: 'LadiesStart', label: 'Ladies Start', default: true},
              {value: 'GentsStart', label: 'Gents Start'}
          ],
          passing: [
              {value: 'PassingRight', label: 'By Passing Right', default: true},
              {value: 'PassingLeft', label: 'By Passing Left'}
          ],
          style: [
              {value: 'Standard', label: 'Standard Hey', default: true},
              {value: 'Ricochet', label: 'Ricochet Hey'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats'},
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      'Long Lines': {
          what: [
              {value: 'ForwardAndBack', label: 'Forward and Back', default: true},
              {value: 'Forward', label: 'Forward'},
              {value: 'Back', label: 'Back'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Mad Robin': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Orbit': {
          who: [
              {value: 'GentsOrbitLadiesAllemande', label: 'Gents Orbit, Ladies Allemande', default: true},
              {value: 'LadiesOrbitGentsAllemande', label: 'Ladies Orbit, Gents Allemande'}
          ],
          direction: [
              {value: 'AllemandeRightOrbitLeft', label: 'Allemande Right, Orbit Left', default: true},
              {value: 'AllemandeLeftOrbitRight', label: 'Allemande Left, Orbit Right'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Pass Through': {
          direction: [
              {value: 'Across', label: 'Across the Set', default: true},
              {value: 'AcrossToAnOceanWave', label: 'Across to an Ocean Wave'},
              {value: 'UpDown', label: 'Up and Down the Set'},
              {value: 'LeftDiagonal', label: 'On Left Diagonal'},
              {value: 'RightDiagonal', label: 'On Right Diagonal'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Petronella': {
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Pousette': {
          who: [
              {value: 'Gents', label: 'Gents Backing Up'},
              {value: 'Ladies', label: 'Ladies Backing Up', default: true},
          ],
          howFar: [
              {value: 'Half', label: 'Half', default: true},
              {value: 'Full', label: 'Full'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats', default: true},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Promenade': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'}
          ],
          direction: [
              {value: 'Across', label: 'Across the Set', default: true},
              {value: 'Side', label: 'Side of Set'},
              {value: 'LeftDiagonal', label: 'Left Diagonal'},
              {value: 'RightDiagonal', label: 'Right Diagonal'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Pull By': {
          who: [
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors', default: true},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          hand: [
              {value: 'Right', label: 'Right', default: true},
              {value: 'Left', label: 'Left'}
          ],
          duration: [
              {value: 2, label: 'For 2 Beats', default: true},
              {value: 4, label: 'For 4 Beats'},
          ]
      },
      'Right and Left Through': {
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Roll Away': {
          halfSashay: [
              {value: 'halfSashay', label: 'With a Half Sashay', default: true},
              {value: 'noHalfSashay', label: 'Without a Half Sashay'}
          ],
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          whoRollsWho: [
              {value: 'GentsRollLadies', label: 'Gents Roll Ladies', default: true},
              {value: 'LadiesRollGents', label: 'Ladies Roll Gents'},
              {value: 'GentsRollGents', label: 'Gents Roll Gents'},
              {value: 'LadiesRollLadies', label: 'Ladies Roll Ladies'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'See Saw': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          howFar: [
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Slice': {
          direction: [
              {value: 'Left', label: 'Left Diagonal', default: true},
              {value: 'Right', label: 'Right Diagonal'}
          ],
          duration: [
              {value: 8, label: 'For 8 Beats', default: true},
          ]
      },
      'Slide By': {
          who: [
              {value: 'Everyone', label: 'Everyone', default: true},
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Star': {
          direction: [
              {value: 'Left', label: 'Left', default: true},
              {value: 'Right', label: 'Right'}
          ],
          howFar: [
              {value: 1, label: '1 Place'},
              {value: 2, label: '2 Places'},
              {value: 3, label: '3 Places'},
              {value: 4, label: '4 Places', default: true},
              {value: 5, label: '5 Places'},
              {value: 6, label: '6 Places'}
          ],
          hands: [
              {value: 'Wrist', label: 'Wrist Style', default: true},
              {value: 'HandsAcross', label: 'Hands Across Style'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats', default: true},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Star Promenade': {
          who: [
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents', default: true},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          hand: [
              {value: 'Right', label: 'By the Right Hand', default: true},
              {value: 'Left', label: 'By the Left Hand'}
          ],
          promenading: [
              {value: 'Partners', label: 'Promenading Partners', default: true},
              {value: 'Neighbors', label: 'Promenading Neighbors'},
              {value: 'Gents', label: 'Promenading Gents'},
              {value: 'Ladies', label: 'Promenading Ladies'},
              {value: 'Ones', label: 'Promenading Ones'},
              {value: 'Twos', label: 'Promenading Twos'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Swat the Flea': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Swing': {
          who: [
              {value: 'Partners', label: 'Partners', default: true},
              {value: 'Neighbors', label: 'Neighbors'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      'Turn': {
          who: [
              {value: 'Everyone', label: 'Everyone', default: true},
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          how: [
              {value: 'Alone', label: 'Alone', default: true},
              {value: 'As a Couple', label: 'As a Couple'},
              // TODO: ones arch business...
          ],
          duration: [
              {value: 2, label: 'For 2 Beats', default: true},
              {value: 4, label: 'For 4 Beats'}
          ]
      },
      'Two Hand Turn': {
          who: [
              {value: 'Everyone', label: 'Everyone', default: true},
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones'},
              {value: 'Twos', label: 'Twos'}
          ],
          howFar: [
              {value: 0.25, label: 'One Quarter'},
              {value: 0.5, label: 'Half Way'},
              {value: 0.75, label: 'Three Quarters'},
              {value: 1.0, label: 'Once Around', default: true},
              {value: 1.25, label: 'Once and a Quarter'},
              {value: 1.5, label: 'Once and a Half'},
              {value: 1.75, label: 'Once and Three Quarters'},
              {value: 2.0, label: 'Twice Around'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      },
      'Walk as a Couple': {
          who: [
              {value: 'Partners', label: 'Partners'},
              {value: 'Neighbors', label: 'Neighbors'},
              {value: 'Gents', label: 'Gents'},
              {value: 'Ladies', label: 'Ladies'},
              {value: 'Ones', label: 'Ones', default: true},
              {value: 'Twos', label: 'Twos'}
          ],
          direction: [
              {value: 'Down', label: 'Down the Hall', default: true},
              {value: 'Up', label: 'Up the Hall'}
          ],
          where: [
              {value: 'InsideTheSet', label: 'Inside the Set', default: true},
              {value: 'OutsideTheSet', label: 'Outside the Set'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 6, label: 'For 6 Beats', default: true},
              {value: 8, label: 'For 8 Beats'}
          ]
      },
      'Walk Four in Line': {
          direction: [
              {value: 'Down', label: 'Down the Hall', default: true},
              {value: 'Up', label: 'Up the Hall'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 6, label: 'For 6 Beats', default: true},
              {value: 8, label: 'For 8 Beats'}
          ]
      },
      'Walk Single File': {
          path: [
              {value: 'InYourGroupOfFour', label: 'In Your Group of Four', default: true},
          ],
          howFar: [
              {value: 1, label: '1 Place'},
              {value: 2, label: '2 Places'},
              {value: 3, label: '3 Places'},
              {value: 4, label: '4 Places', default: true},
              {value: 5, label: '5 Places'},
              {value: 6, label: '6 Places'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats'}
          ]
      }
  }
};
