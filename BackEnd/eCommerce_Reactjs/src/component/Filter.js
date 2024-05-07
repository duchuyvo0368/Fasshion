import React, { useEffect } from 'react';
import jsrecommender from 'js-recommender'
function Filter(props) {
    useEffect(() => {
        let recommender = new jsrecommender.Recommender();

        let table = new jsrecommender.Table();
        table.setCell('Love at last', 'Alice', 5);
        table.setCell('Remance forever', 'Alice', 5);
        table.setCell('Nonstop car chases', 'Alice', 0);
        table.setCell('Sword vs. karate', 'Alice', 0);
        table.setCell('Love at last', 'Bob', 5);
        table.setCell('Cute puppies of love', 'Bob', 4);
        table.setCell('Nonstop car chases', 'Bob', 0);
        table.setCell('Sword vs. karate', 'Bob', 0);
        table.setCell('Love at last', 'Carol', 0);
        table.setCell('Cute puppies of love', 'Carol', 0);
        table.setCell('Nonstop car chases', 'Carol', 5);
        table.setCell('Sword vs. karate', 'Carol', 5);
        table.setCell('Love at last', 'Dave', 0);
        table.setCell('Remance forever', 'Dave', 0);
        table.setCell('Nonstop car chases', 'Dave', 4);

        let model = recommender.fit(table);
        console.log(model);

        let predicted_table = recommender.transform(table);

        console.log(predicted_table);


        for (let i = 0; i < predicted_table.columnNames.length; ++i) {
            let user = predicted_table.columnNames[i];
            console.log('For user: ' + user);
            for (let j = 0; j < predicted_table.rowNames.length; ++j) {
                let movie = predicted_table.rowNames[j];
                console.log('Movie [' + movie + '] has actual rating of ' + Math.round(table.getCell(movie, user)));
                console.log('Movie [' + movie + '] is predicted to have rating ' + Math.round(predicted_table.getCell(movie, user)));
            }
        }
    })

    return (
        <div className="row justify-content-center">

        </div>

    );
}

export default Filter;