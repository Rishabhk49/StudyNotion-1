const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Fetch the selected category and its courses
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
          { path: "instructor" },
          { path: "ratingAndReviews" },
      ],
  })
  .exec();
      
      console.log("SELECTED COURSE-:",selectedCategory);

    // Handle case where category is not found
    if (!selectedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Handle case where no courses are found in the selected category
    // if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No courses found for the selected category."
    //   });
    // }
    
    const differentCategories =await Category.find({
                             _id:{$ne:categoryId},
                            })
                              .populate("courses")
                              .exec();

   const selectedCourses = selectedCategory.courses;

    // Fetch courses from other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId }
    }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        { path: "instructor" },
        { path: "ratingAndReviews" }
      ]
    });

    // Collect courses from other categories
    let differentCourses = [];
    for (const category of categoriesExceptSelected) {
      if (category.courses) {
        differentCourses.push(...category.courses);
      }
    }

    //Fetch and sort top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        { path: "instructor" },
        { path: "ratingAndReviews" }
      ]
    });

     const allCourses = allCategories.flatMap(category => category.courses);
    // const mostSellingCourses = allCourses
    //   .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
    //   .slice(0, 10);

    // Return the response with the selected courses, different courses, and most-selling courses
    res.status(200).json({
      success: true,
      data: {
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      // mostSellingCourses: mostSellingCourses
      }
    });

  } catch (error) {
    // Handle error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};