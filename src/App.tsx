// NetworkCreationForm.jsx
import React, { useState } from 'react';
import './NetworkCreationForm.css';

const NetworkCreationForm = () => {
	const [formData, setFormData] = useState({
		parent_id: '',
		bits: '',
		terminal: '',
		vlan_id: '',
		name: '',
		infra_id: '',
		provider_id: '',
		available: true,
		network: '',
		vrf_id: '',
		server_range_begin: '',
		server_range_end: '',
		network_range_begin: '',
		network_range_end: '',
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('Form submitted:', formData);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const handleReset = () => {
		setFormData({
			parent_id: '',
			bits: '',
			terminal: '',
			vlan_id: '',
			name: '',
			infra_id: '',
			provider_id: '',
			available: true,
			network: '',
			vrf_id: '',
			server_range_begin: '',
			server_range_end: '',
			network_range_begin: '',
			network_range_end: '',
		});
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit} className="network-form">
				<h1>Create Network</h1>

				<div className="form-grid">
					<div className="form-group">
						<label htmlFor="parent_id">Parent ID</label>
						<input
							type="text"
							id="parent_id"
							name="parent_id"
							value={formData.parent_id}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="bits">Bits</label>
						<input
							type="text"
							id="bits"
							name="bits"
							value={formData.bits}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="terminal">Terminal</label>
						<input
							type="text"
							id="terminal"
							name="terminal"
							value={formData.terminal}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="vlan_id">VLAN ID</label>
						<input
							type="number"
							id="vlan_id"
							name="vlan_id"
							value={formData.vlan_id}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group full-width">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="infra_id">Infrastructure ID</label>
						<input
							type="text"
							id="infra_id"
							name="infra_id"
							value={formData.infra_id}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="provider_id">Provider ID</label>
						<input
							type="text"
							id="provider_id"
							name="provider_id"
							value={formData.provider_id}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group full-width">
						<label htmlFor="network">Network</label>
						<input
							type="text"
							id="network"
							name="network"
							value={formData.network}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="vrf_id">VRF ID</label>
						<input
							type="text"
							id="vrf_id"
							name="vrf_id"
							value={formData.vrf_id}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="server_range_begin">Server Range Begin</label>
						<input
							type="text"
							id="server_range_begin"
							name="server_range_begin"
							value={formData.server_range_begin}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="server_range_end">Server Range End</label>
						<input
							type="text"
							id="server_range_end"
							name="server_range_end"
							value={formData.server_range_end}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="network_range_begin">Network Range Begin</label>
						<input
							type="text"
							id="network_range_begin"
							name="network_range_begin"
							value={formData.network_range_begin}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="network_range_end">Network Range End</label>
						<input
							type="text"
							id="network_range_end"
							name="network_range_end"
							value={formData.network_range_end}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-footer">
					<div className="checkbox-group">
						<label htmlFor="available" className="checkbox-label">
							<input
								type="checkbox"
								id="available"
								name="available"
								checked={formData.available}
								onChange={handleChange}
							/>
							Available
						</label>
					</div>

					<div className="button-group">
						<button
							type="button"
							onClick={handleReset}
							className="reset-button"
						>
							Reset
						</button>
						<button type="submit" className="submit-button">
							Create Network
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NetworkCreationForm;
