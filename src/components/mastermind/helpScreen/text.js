import React from "react"


const text = {
    fr : {
        0 : {
            "title" : "Objectif du jeu",
            "text" :<div className = "text">
                        <p className = "default">
                              Le but du jeu est de deviner une combinaison composée de 4 couleurs.
                         </p>
                         <p className = "default">
                              La combinaison peut contenir 1, 2, 3 ou 4 couleurs différentes.
                         </p>
                         <p className = "default">
                              L'objectif est de trouver la combinaison en un minimum de coups.
                         </p>
                         <p className = "default">
                              Vous perdez si aucune de vos tentatives ne correspond à la bonne combinaison.
                         </p>
                     </div>,
        },
        1 : {
            "title" : "Début",
            "text" : undefined,
        },
        2 : {
            "title" : "Choisir une combinaison",
            "text" : <div className = "text">
                        <p className = "default">
                            Choisissez vos couleurs en utilisant les boutons du bas, puis
                             définissez votre combinaison sur la 1ère ligne des disques gris.
                        </p>
                        <p className = "default">
                             Ensuite appuyez sur le <strong>tick</strong> pour valider. La qualité de votre combinaison est évaluée sur la droite.
                        </p>
                        <p className = "default">
                             <strong>Point rouge</strong> : un des disques est de la bonne couleur et au bon endroit.
                        </p>
                        <p className = "default">
                             <strong>Point blanc</strong> : un des disques est de la bonne couleur mais pas au bon endroit.
                        </p>
                     </div>,
        },
        3 : {
            "title" : "Comprendre le retour",
            "text" : undefined,
        },
        4 : {
            "title" : "Jouez jusqu'à la victoire (ou la défaite) !",
            "text" : <div className = "text">
                        <p className = "default">
                            Essayez de nouveau sur la ligne suivante, réfléchissez, jouez et gagnez !
                        </p>
                     </div>,
        },
    },
    us : {
        0 : {
            "title" : "Game description",
            "text" :<div className = "text">
                        <p className = "default">
                              The goal of the game is to guess a combination composed of 4 colors.
                         </p>
                         <p className = "default">
                              The combination can be made of 1, 2, 3 or 4 different colors.
                         </p>
                         <p className = "default">
                              The goal is to find the combination in a minimum number of guesses.
                         </p>
                         <p className = "default">
                              You loose if none of your attempts correspond to the right combination.
                         </p>
                     </div>,
        },
        1 : {
            "title" : "Beginning",
            "text" : undefined,
        },
        2 : {
            "title" : "Choose a combination",
            "text" : <div className = "text">
                        <p className = "default">
                            Choose your colors using the bottom buttons, then
                            "build your combination using the 1st line of grey disks.
                        </p>
                        <p className = "default">
                             Then press on the <strong>tick</strong> to validate your choice. The quality of your guess
                             "is assessed on the right using red and white dots:
                        </p>
                        <p className = "default">
                             <strong>Red dot</strong>: one of the disks has the right color and is at the right spot.
                        </p>
                        <p className = "default">
                             <strong>White dot</strong>: one of the disks has the right color but is not at the correct spot.
                        </p>
                     </div>,
        },
        3 : {
            "title" : "Understand the feedback",
            "text" : undefined,
        },
        4 : {
            "title" : "Play until victory (or defeat)!",
            "text" : <div className = "text">
                        <p className = "default">
                            Try again on the next line, think, take actions and win!
                        </p>
                     </div>,
        },
    },
};

export default text
