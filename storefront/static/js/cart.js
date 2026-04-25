// JavaScript for handling cart interactions

function refreshCart() {
  // Implementation for refreshing the cart
  console.log("Cart refreshed"); // Debugging: Check if the function is called

  // Refresh the page to reflect the updated cart contents
  // location.reload();
}

function refreshSummary() {
  // Implementation for refreshing the summary
  console.log("Summary refreshed"); // Debugging: Check if the function is called

  // Refresh the values in the summary section without reloading the entire page
  $("#subtotalValue").load(location.href + " #subtotalValue");
  $("#taxValue").load(location.href + " #taxValue");
  $("#totalValue").load(location.href + " #totalValue");
}

$(document).ready(function () {
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
        // Refresh the summary section to reflect the updated cart information
        refreshSummary();
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
