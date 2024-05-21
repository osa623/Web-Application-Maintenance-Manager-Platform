import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS } from 'chart.js/auto';

const PieChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/Fund/getall');
                const funds = response.data;

                // Data processing logic
                const donationFund = funds.filter(fund => fund.fundSource === 'Donation').reduce((total, fund) => total + fund.amount, 0);
                const adoptionFund = funds.filter(fund => fund.fundSource === 'Adoption').reduce((total, fund) => total + fund.amount, 0);

                setChartData({
                    labels: ['Donation Fund', 'Adoption Fund'],
                    datasets: [{
                        label: 'Funds Distribution',
                        data: [donationFund, adoptionFund],
                        backgroundColor: ['#36A2EB', '#FFCE56'],
                        hoverOffset: 4,
                    }]
                });
            } catch (error) {
                console.error('Error fetching funds:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <h2>Funds Distribution</h2>
            {chartData && <Pie data={chartData} options={{ responsive: true }} />}
        </div>
    );
};

export default PieChart;
