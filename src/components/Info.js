import React, { Component, Fragment } from 'react'

export default class Info extends Component {
  render() {
      const {attack: attack1, block: block1, dodge: dodge1, crit: crit1, luck: luck1} = this.props.player1Hits;
      const {attack: attack2, block: block2, dodge: dodge2, crit: crit2, luck: luck2} = this.props.player2Hits;
    return (
        <div>
            <p className="log">
            {attack1 !== undefined && attack1 !== 0 && 
             <Fragment>
                 <span role='img'> 🗡</span> {attack1} <span className="devider">|</span>
             </Fragment>
            }
            {block1 !== undefined && block1 !== 0 && 
              <Fragment>
                  <span role='img'> 🛡</span> {block1} <span className="devider">|</span>
              </Fragment>  
            }
            {crit1 && 
            attack1 !== undefined &&
            attack1 !== 0 &&
            <Fragment>
               <span role='img'> ⚔️</span> <span className="crit">CRIT</span> <span className="devider">|</span>
            </Fragment> 
            }
            {dodge1 && 
            <Fragment>
                <span role='img'> 🐍</span> <span className="dodge">DODGE</span> <span className="devider">|</span>
            </Fragment> 
            }  
            {luck1 && 
            <Fragment>
               <span role='img'> 🍀</span> <span className="luck">LUCK</span> <span className="devider">|</span>
            </Fragment> 
            }  
            </p>
            {/*  player 2 hits */}
            <p className="log">
            {attack2 !== undefined && attack2 !== 0 && 
             <Fragment>
                 <span role='img'>🗡</span> {attack2} <span className="devider">|</span>
             </Fragment>
            }
            {block2 !== undefined && block2 !== 0 && 
              <Fragment>
                  <span role='img'>🛡</span> {block2} <span className="devider">|</span>
              </Fragment>  
            }
            {crit2 && 
            attack2 !== undefined && 
            attack2 !== 0 &&
            <Fragment>
               <span role='img'> ⚔️</span> <span className="crit">CRIT</span> <span className="devider">|</span>
            </Fragment> 
            }
            {dodge2 && 
            <Fragment>
               <span role='img'> 🐍</span> <span className="dodge">DODGE</span> <span className="devider">|</span>
            </Fragment> 
            }  
            {luck2 && 
            <Fragment>
               <span role='img'> 🍀</span> <span className="luck">LUCK</span> <span className="devider">|</span>
            </Fragment> 
            }  
            </p>
            
        </div>
    )
  }
}
