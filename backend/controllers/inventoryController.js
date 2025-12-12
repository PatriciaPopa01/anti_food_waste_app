const { Product } = require('../models');

const createProduct = async (req, res) => {
    try {
        const ownerId = req.user.id;
        let { name, category, quantity, expiryDate, notes } = req.body;

        // validări minime
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "name is required" });
        }
        if (!category || !category.trim()) {
            return res.status(400).json({ message: "category is required" });
        }
        if (!quantity || !quantity.trim()) {
            return res.status(400).json({ message: "quantity is required" });
        }
        if (!expiryDate) {
            return res.status(400).json({ message: "expiryDate is required (YYYY-MM-DD)" });
        }

        const product = await Product.create({
            ownerId,
            name: name.trim(),
            category: category.trim(),
            quantity: quantity.trim(),
            expiryDate,                
            notes: notes?.trim() || null
        });

        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { category, status, sort, order } = req.query;

        const whereClause = {};
        if (category) {
            whereClause.category = category;
        }
        if (status) {
            whereClause.status = status;
        }

        let orderClause = [['expiryDate', 'ASC']];

        if (sort) {
            const sortField = sort === 'expiry_date' ? 'expiryDate' :
                sort === 'created_at' ? 'createdAt' :
                    'name';
            const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
            orderClause = [[sortField, sortOrder]];
        }

        const products = await Product.findAll({
            where: whereClause,
            order: orderClause
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};