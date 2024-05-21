import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/Fund/getall');
                const funds = response.data;

                // Data processing logic
                const donationFund = funds.filter(fund => fund.fundSource === 'Donation').reduce((total, fund) => total + fund.amount, 0);
                const adoptionFund = funds.filter(fund => fund.fundSource === 'Adoption').reduce((total, fund) => total + fund.amount, 0);
                const total = donationFund + adoptionFund;

                setChartData({
                    labels: ['Donation Fund', 'Adoption Fund'],
                    datasets: [{
                        label: 'Funds Distribution',
                        data: [donationFund, adoptionFund],
                        backgroundColor: ['#36A2EB', '#FFCE56'],
                    }]
                });

                setTotalAmount(total);
            } catch (error) {
                console.error('Error fetching funds:', error);
                setChartData(null); // Reset chartData to null in case of an error
                setTotalAmount(0);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-400 h-300">
            <h2 className="text-center">Funds Distribution</h2>
            {chartData ? <Bar data={chartData} options={{ responsive: true }} /> : <p className="text-center">No data available</p>}
            <div className="text-center font-bold text-s">Total Fund Amount</div>
            <div className="text-center font-bold text-2xl">Rs.{totalAmount.toLocaleString()}.00</div>
        </div>
    );
};

export default BarChart;
