import React from 'react'

function CardNotification() {
  return (
    <>
        <div className="left">
            <div className="problem">
                <span>Problem A - E Power of Points</span>
            </div>
            <div className="time-sub">
                <div>
                    <span>07 August 2023 21:45</span>
                </div>

                <div>
                    <a href='#'>Check submission</a> 
                </div>
            </div>
        </div>
        <div className="accepted">
            <span>Accepted</span>
        </div>
    </>
  )
}

export default CardNotification