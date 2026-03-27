const emojis = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    strawberry: '🍓',
    pineapple: '🍍',
    watermelon: '🍉',
};

const getEmoji = (name) => {
    const key = name?.toLowerCase();
    return emojis[key] || '🍑';
};


const FruitCard = ({ fruit }) => {


    return (
        <div className='fruit-card'>
            <div className="fruit-emoji">{getEmoji(fruit.name)}</div>
            <div className="fruit-info">
                <h3>{fruit.name}</h3>
                <div className="fruit-meta">
                    <span className='fruit-price'>Ksh {fruit.price}</span>
                    <span className='fruit-qty'>Qty: {fruit.quantity}</span>
                </div>
            </div>
        </div>
    )
}

export default FruitCard