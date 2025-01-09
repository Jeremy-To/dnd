import React, { useState } from 'react';

const BubbleMenu = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="menu-overlay" onClick={onClose}>
			<div className="menu-bubble" onClick={(e) => e.stopPropagation()}>
				<ul className="menu-items">
					<li>Accueil</li>
					<li>Profil</li>
					<li>Paramètres</li>
					<li>Aide</li>
					<li>Déconnexion</li>
				</ul>
			</div>
		</div>
	);
};

export default BubbleMenu;
