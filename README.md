## Pokersolver for chinese poker

This is the wrap on the pokersolver.

### Methods

#### calculate(hands)

This method returns an array with information about total points  
```javascript
[ 
    { total: -6, top: -1, middle: -1, bottom: -1, bonus: -3 }, 
    { total: 12, top: 2, middle: 2, bottom: 2, bonus: 6 },  
    { total: -6, top: -1, middle: -1, bottom: -1, bonus: -3 }    
]
```

#### isFouls(hand)

This method checking passed hand for correct lines. If one of higher line is more
 powerful then lower, that returns true. If hand is correct, it returns false
 
#### getPoints(cards, line)

This method expect original pokersolver object (Hand.solve()) and ***line*** = 'top', 'middle' or 'bottom', and returns number 
of points for this 

#### makeHand(hand)

Transform hands lines to pokersolver objects

### Datatypes

#### hands
***hands*** object should be an array with two or three objects and looks like: 

```javascript
[
    {
        top: ['As', 'Kc', 'Td'],
        middle: ['5d', '4h', '4c', '3s', '3c'],
        bottom: ['Jh', '7h', '7d', '6d', '6c']
    },
    {
        top: ['Kd', 'Qc', '7s'],
        middle: ['Kh', 'Qh', '8h', '6s', '6h'],
        bottom: ['Ah', 'Ad', 'Ac', '9s', '9d']
    },
    {
        top: ['5s', '4d', '2c'],
        middle: ['9h', '9c', '8s', '8d', '7c'],
        bottom: ['Js', 'Jd', 'Jc', 'Ts', 'Tc']
    }
]
```
