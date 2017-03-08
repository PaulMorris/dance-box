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
          {value: 'FourFacingFour', label: 'Four Facing Four'},
          {value: 'Tempest', label: 'Tempest'},
          {value: 'Square', label: 'Square'},
          {value: 'Break', label: 'Break'},
          {value: 'Other', label: 'Other'}
      ],
      progression: [
          {value: 1, label: 'Single Progression', default: true},
          {value: 2, label: 'Double Progression'},
          {value: 3, label: 'Triple Progression'},
          {value: 4, label: 'Quadruple Progression'}
      ],
      level: [
          {value: 'unsetLevel', label: 'Level Unset', default: true},
          {value: 'Beginner', label: 'Beginner Level'},
          {value: 'Novice', label: 'Novice Level'},
          {value: 'Intermediate', label: 'Intermediate Level'},
          {value: 'Advanced', label: 'Advanced Level'}
      ],
      mixedLevel: [
          {value: 'mixedLevelUnset', label: 'Mixed Level Unset', default: true},
          {value: 'mixedLevelFriendly', label: 'Mixed Level Friendly'},
          {value: 'mixedLevelUnfriendly', label: 'Mixed Level Unfriendly'}
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
      Circle: {
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
      Star: {
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
      Swing: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats'},
              {value: 8, label: 'For 8 Beats'},
              {value: 12, label: 'For 12 Beats'},
              {value: 16, label: 'For 16 Beats', default: true}
          ]
      },
      Balance: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      Allemande: {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'},
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
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Courtesy Turn': {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
          ],
          duration: [
              {value: 4, label: 'For 4 Beats', default: true}
          ]
      },
      'Long Lines F & B': {
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Right and Left Through': {
          duration: [
              {value: 8, label: 'For 8 Beats', default: true}
          ]
      },
      'Promenade': {
          who: [
              {value: 'Partner', label: 'Partner', default: true},
              {value: 'Neighbor', label: 'Neighbor'}
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

  }
};
