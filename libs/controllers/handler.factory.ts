const deleteOne = (sourceModel: any) => {
  return async (req: any, res, next) => {
    try {
      const deleted = await sourceModel.findByIdAndDelete(req.params.id);
      if (!deleted) throw new Error('Document with ID not found!');
      res
        .status(204)
        .json({ data: deleted, totalCount: deleted.length, status: 204 });
    } catch (error: any) {
      res.status(404).json({ data: error.message, status: 404 });
    }
  };
};

const updateOne = (sourceModel: any) => {
  return async (req: any, res, next) => {
    try {
      const updated = await sourceModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidator: true,
        }
      );
      if (!updated) throw new Error('Document with ID not found!');
      res
        .status(204)
        .json({ data: updated, totalCount: updated.length, status: 204 });
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

const getOne = (sourceModel: any, populateOptions: any) => {
  return async (req: any, res, next) => {
    try {
      let query = sourceModel.findById(req.params.id, req.body);
      if (populateOptions) query = query.populate(populateOptions);
      const documents = await query;
      if (!documents) throw new Error('Document with ID not found!');
      res
        .status(200)
        .json({ data: documents, totalCount: documents.length, status: 200 });
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

const handler = { deleteOne, updateOne, getOne };
export default handler;
