import React, { useState } from 'react';

const BubbleMenu = ({ isOpen, onClose }) => {
	const handleOverlayClick = (e) => {
		if (e.target.className === 'menu-overlay') {
			onClose();
		}
	};

	// Gestionnaire pour la touche Echap
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

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
