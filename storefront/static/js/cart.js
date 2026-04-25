// JavaScript for handling cart interactions

function refreshCart() {
  // Implementation for refreshing the cart
  console.log("Cart refreshed"); // Debugging: Check if the function is called
  // You can add code here to update the cart count or refresh the cart contents
  // Refresh the page to reflect the updated cart contents
  location.reload();
}

function refreshSummary() {
  // Implementation for refreshing the summary
  console.log("Summary refreshed"); // Debugging: Check if the function is called
  // You can add code here to update the summary section with the latest cart information
  // Refresh the page to reflect the updated summary
  location.reload();
}

$(document).ready(function () {
  // Add click event listener to the "Add to Cart" button
  $("#addCartButton").click(function () {
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Get the product ID from the button's data attribute
    const productId = $(this).data("product-id");
    console.log("Product ID:", productId); // Debugging: Check if the product ID is correct
    // Send an AJAX request to add the product to the cart
    $.ajax({
      url: `/cart/add/${productId}/`, // URL to your Django view that handles adding to cart
      method: "POST",
      data: {
        product_id: productId,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Include CSRF token
      },
      success: function (response) {
        // Handle success (e.g., show a success message or update cart count)
        // refreshCart();
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });

  // Add click event listener to the "Remove from Cart" button
  $("#cartTableBody").on("click", "#removeCartButton", function () {
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Get the product ID from the button's data attribute
    const productId = $(this).data("product-id");
    console.log("Product ID to remove:", productId); // Debugging: Check if the product ID is correct
    // Send an AJAX request to remove the product from the cart
    $.ajax({
      url: `/cart/remove/${productId}/`, // URL to your Django view that handles removing from cart
      method: "POST",
      data: {
        product_id: productId,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Include CSRF token
      },
      success: function (response) {
        // Handle success (e.g., show a success message or update cart count)
        // Remove the entire table row corresponding to the removed item
        $(`#removeCartButton[data-product-id="${productId}"]`)
          .closest("tr")
          .remove();
        // Check if the cart is empty after removal and refresh the cart
        if ($("#cartTableBody tr").length === 0) refreshCart();
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });
});
