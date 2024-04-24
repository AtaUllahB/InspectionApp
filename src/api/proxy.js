module.exports = async (req, res) => {
    const response = await fetch('http://203.135.63.93:81');
    const data = await response.json();
    
    res.status(200).json(data);
  };