const processor = {
  clean: (word) => word.replace(/^[^a-zA-Z ]*$/g, '').trim(),
};

module.exports = processor;
